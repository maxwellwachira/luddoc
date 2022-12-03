import { Request, Response } from "express";
import { Mpesa } from "mpesa-api";
import dotenv from "dotenv";

dotenv.config();

let callbackStatus = 'pending';

const credentials = {
    clientKey: process.env.MPESA_CONSUMER_KEY as string,
    clientSecret: process.env.MPESA_CONSUMER_SECRET as string,
    initiatorPassword: process.env.MPESA_INITIATOR_PASSWORD as string
};

const baseUrl = 'https://backend.luddoc-institute.com';
const urls = {
    QueueTimeOutURL: `${baseUrl}/daraja/b2c/queue`,
    ResultURL: `${baseUrl}/daraja/b2c/result`,
    ConfirmationURL: `${baseUrl}/daraja/confirmation`,
    ValidationURL: `${baseUrl}/daraja/validation`,
    callBackUrl: `${baseUrl}/daraja/callback`,
}

const environment = process.env.MPESA_ENVIRONMENT as "production" | "sandbox";

// create a new instance of the api
const mpesa = new Mpesa(credentials, environment);

const customerToBusiness = async (req: Request, res: Response) => {
    const { amount, msisdn, accountNumber} = req.body;
    try {
       await mpesa.c2bRegister({
        ShortCode: Number(process.env.MPESA_C2B_SHORT_CODE),
        ConfirmationURL: urls.ConfirmationURL,
        ValidationURL: urls.ValidationURL,
        ResponseType: "Completed",
       });

       const transaction = await mpesa.c2bSimulate({
            ShortCode: Number(process.env.MPESA_C2B_SHORT_CODE),
            Amount: amount,
            Msisdn: msisdn,
            CommandID: 'CustomerPayBillOnline',
            BillRefNumber: accountNumber
        });
        console.log(transaction);
        return res.status(201).json({transaction, message:"success"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"error", error});
    }
}

const validationUrl = async (req: Request, res: Response) => {
    let response = {
        ResultCode: 0,
        ResultDesc: "Accepted"
    };
    res.json(response);
}

const confirmationUrl = async (req: Request, res: Response) => {
    const response = req;
    console.log(response);
    res.send(response);
}

const acountBalance = async (req: Request, res: Response) => {
    try {
        const transaction = await mpesa.accountBalance({
            Initiator: process.env.MPESA_INITIATOR as string,
            PartyA: process.env.MPESA_C2B_SHORT_CODE as string,
            IdentifierType: "4",
            QueueTimeOutURL: urls.QueueTimeOutURL,
            ResultURL: urls.ResultURL,
            CommandID: "AccountBalance", 
            Remarks: `Balance for ${ process.env.MPESA_INITIATOR}` ,
        });
        console.log(transaction);
        return res.status(201).json({transaction, message:"success"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"error", error});
    }
}

const transactionStatus = async (req: Request, res: Response) => {
    const { transactionId } = req.body;
    try {
        const transaction = await mpesa.transactionStatus({
            Initiator: process.env.MPESA_INITIATOR as string,
            TransactionID: transactionId,
            PartyA: process.env.MPESA_C2B_SHORT_CODE as string,
            IdentifierType: "4",
            QueueTimeOutURL: urls.QueueTimeOutURL,
            ResultURL: urls.ResultURL,
            CommandID: "TransactionStatusQuery", 
            Remarks: "Query transaction status" 
        });
        console.log(transaction);
        return res.status(201).json({transaction, message:"success"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"error", error});
    }
}

const lipaNaMpesaOnline = async (req: Request, res: Response) => {
    const { amount, phoneNumber, accountNumber } = req.body;
    try {
        const transaction = await mpesa.lipaNaMpesaOnline({
            BusinessShortCode: Number(process.env.MPESA_BUSINESS_SHORTCODE),
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: process.env.MPESA_BUSINESS_SHORTCODE as string,
            PhoneNumber: phoneNumber,
            CallBackURL: urls.callBackUrl,
            AccountReference: accountNumber,
            passKey: process.env.MPESA_PASSKEY as string,
            TransactionType: "CustomerPayBillOnline",
            TransactionDesc: "LIpa na mpesa online",
        });
        console.log(transaction);
        return res.status(200).json({transaction, message:"success"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"error", error});
    }
}



const callbackUrl = async (req: Request, res: Response) => {
    callbackStatus = "pending";
    const response = req.body.Body.stkCallback;
    if(Number(response.ResultCode) === 0){
        //initate websocket with success message
        callbackStatus = "success";
    }else{
        //initiate ws with error message
        callbackStatus = "failed";
    }
    console.log(callbackStatus);
}

const paymentEvent = (req: Request, res: Response) => {
    const SEND_INTERVAL = 2000;
    
    callbackStatus = "pending";

    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    setInterval(() => {
        res.write(`data: ${JSON.stringify(callbackStatus)}\n\n`);
    }, SEND_INTERVAL);

    res.write(`data: ${JSON.stringify(callbackStatus)}\n\n`);
}


const lipaNaMpesaQuery = async(req: Request, res: Response) => {
    const { checkoutRequestID } = req.body;

    try {
        const transaction = await mpesa.lipaNaMpesaQuery({
            BusinessShortCode:  Number(process.env.MPESA_BUSINESS_SHORTCODE),
            CheckoutRequestID: checkoutRequestID,
            passKey: process.env.MPESA_PASSKEY as string,
        });
        console.log(transaction);
        return res.status(200).json({transaction, message:"success"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"error", error});
    }
}


export {
    acountBalance,
    callbackUrl,
    confirmationUrl,
    customerToBusiness,
    lipaNaMpesaQuery,
    lipaNaMpesaOnline,
    paymentEvent,
    transactionStatus,
    validationUrl
}

