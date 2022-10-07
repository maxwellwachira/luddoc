import { Request, Response } from "express";
import argon2 from "argon2";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import crypto from "crypto";
import moment from "moment";
import dotenv from 'dotenv';

import { addToken,findToken } from "./authService"
import { findUserByEmail, findUserById } from "../../users/userService";
import { sendMail } from "../../email/sendEmail";
import emailTemplates from "../../email/emailTemplates";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as Secret;
const EXPIRE_TIME = process.env.EXPIRE_TIME;
const REFRESH_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET as Secret;
const REFRESH_EXPIRE_TIME = process.env.REFRESH_EXPIRE_TIME;

const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        //check if user already exists otherwise return error message
        const existingUser =  await findUserByEmail(email);
        if(!existingUser) return res.status(404).json({message: "user does not exists"});
        //check if the entered password is OK to the save password otherwise return error message
        const { id, email: userEmail, password: userPassword} = existingUser.toJSON();
        const isPasswordCorrect = await argon2.verify(userPassword, password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});
        //return tokens to user
        const accessToken = jwt.sign({ email: userEmail, id }, SECRET_KEY, { expiresIn: Number(EXPIRE_TIME) }); 
        const refreshToken = jwt.sign({ email: userEmail, id }, REFRESH_SECRET_KEY, { expiresIn: REFRESH_EXPIRE_TIME }); 
        return res.status(200).json({ accessToken,  refreshToken});

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "error", error});
    }
}

const refreshAccessToken = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({message: "unauthorized"});

    try {
        const decodeData = jwt.verify(token, REFRESH_SECRET_KEY) as JwtPayload;
        //get user from decodedData information
        const user = await findUserById(decodeData?.id);
        if(!user) return res.status(404).json({message: "user does not exists"});
        const { id, email } = user.toJSON();
        //return new access token and the same refresh token to the user to the user
        const accessToken = jwt.sign({ email, id }, SECRET_KEY, { expiresIn: EXPIRE_TIME }); 
        return res.status(200).json({ accessToken, refreshToken: token });
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: "invalid Token"});
    }
}

const forgotPassword =  async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
       //check if user already exists otherwise return error message
       const existingUser =  await findUserByEmail(email);
       if(!existingUser) return res.status(404).json({message: "user does not exists"}); 
       //Extract user id from object and add token to db
       const { id: UserId, firstName } = existingUser.toJSON();
       //generate token
       const token = crypto.randomBytes(32).toString('hex');
       //add token to db
       const record  = await addToken({token, UserId});
       //Send Email, url to have token and Userid
       const url = `http://localhost:3000/auth/password-reset?token=${token}&email=${email}&id=${UserId}}`;
       await sendMail({to: email, subject: 'Password Recovery', html: emailTemplates.passwordReset(firstName, 'Password Recovery', url)});

       return res.status(201).json({record, message:"success"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"error", error});
    }
}

const passwordReset =  async (req: Request, res: Response) => {
    const { token, UserId, password } =  req.body;
    if (!token) return res.status(400).json({message:"undefined reset token"});

    try {
       const resetToken = await findToken({ token, UserId });
       if(!resetToken) return res.status(400).json({message: "invalid token"});
       //Delete token so that it is not used again
       await resetToken.destroy();
       //check if token has expired 
       const { createdAt } = resetToken.toJSON();
       const currentTime =  moment(new Date(), moment.ISO_8601);
       const diff = currentTime.diff(moment(createdAt, moment.ISO_8601), "minutes");
       const resetExpireTime = process.env.RESET_TOKEN_EXPIRE_TIME;
       if (diff >= Number(resetExpireTime)) return res.status(400).json({message: "token has expired"});
       //Updating user password logic
       const user = await findUserById(UserId);
       if (!user) return res.status(404).json({message: "user does not exists"}); 
       //hash password
       const hashedPassword = await argon2.hash(password);
       user.update({password: hashedPassword});

       return res.status(200).json({message: "success"});
    } catch (error) {
        return res.status(500).json({message:"error", error});
    }
}


export {
    forgotPassword,
    passwordReset,
    refreshAccessToken,
    signIn,
} 
