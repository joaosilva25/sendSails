import nodemailer from 'nodemailer';
import {Request,Response} from 'express'
import dotenv from 'dotenv';

dotenv.config()

export const send=async(req:Request, res:Response)=> {
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    let {from,to,subject,text}=req.body

    if(from && to && subject && text) {
        let message = {
            from,
            to,
            subject,
            text
        }

        try {
            await transport.sendMail(message);
            res.json({status:'Email enviado',message})
            console.log('Enviado')
        }
        catch(err) {
            res.json({status:'Erro no envio do Email'})
        }
    }
}


