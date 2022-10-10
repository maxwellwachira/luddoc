import express, { Application } from 'express';
import cors from "cors";
import dotenv from 'dotenv';

//Sequelize Database Connector
import { dbAuthenticate } from "./src/config/dbconfig";
//Authentication Routes
import authRoutes from "./src/authentication/emailAuth/authRoutes";
//User Routes
import userRoutes from "./src/users/userRoutes";
//zoom routes
import ZoomRoutes from "./src/zoom/zoomRoutes";
//email routes
import emailRoutes from "./src/email/emailRoutes";
dotenv.config();

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/zoom', ZoomRoutes);
app.use('/email',emailRoutes);

app.listen(port, ()=> {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    dbAuthenticate();
});
