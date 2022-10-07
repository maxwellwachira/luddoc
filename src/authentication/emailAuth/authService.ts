import dotenv from "dotenv"
import { PasswordResetModel } from "./authModel";;

dotenv.config();

interface PasswordResetData {
    token: string;
    UserId: number;
}

const addToken = async ({ token, UserId }: PasswordResetData) => {

    return await PasswordResetModel.create({
        token,
        UserId
    });
}

const findToken =  async ({ token, UserId }: PasswordResetData) => {
    return await PasswordResetModel.findOne({
        where: {
            token,
            UserId
        }
    })
}


export {
    addToken,
    findToken
};