import express, {Request} from "express";

import {
    acountBalance,
    callbackUrl,
    confirmationUrl,
    customerToBusiness,
    lipaNaMpesaQuery,
    lipaNaMpesaOnline,
    paymentEvent,
    transactionStatus,
    validationUrl
} from "./mpesaController";

import { validationMiddleware } from "../middleware/validationMiddleware";
import mpesaValidator from "./mpesaValidator";


const router = express.Router();

//Lipa na Mpesa
router.post('/lipa-na-mpesa', mpesaValidator.checkLipaNaMpesa(), validationMiddleware, lipaNaMpesaOnline);
//Query Lipa na mpesa
router.post('/lipa-na-mpesa-query', lipaNaMpesaQuery);
//C2B
router.post('/c2b', mpesaValidator.checkC2B(), validationMiddleware, customerToBusiness);
//Balance
router.post('/balance', acountBalance);
//transaction status
router.post('/transaction-status', mpesaValidator.checkTransactionStatus(), validationMiddleware, transactionStatus);

//Callback url
router.post('/callback', callbackUrl);
//confirmation url
router.post('/confirmation', confirmationUrl);
//validation url, 
router.post('/b2c/result', validationUrl);

//payment event
router.get('/payment-event', paymentEvent);


export default router;