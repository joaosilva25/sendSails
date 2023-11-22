import nodemailer from 'nodemailer';
import {Request,Response} from 'express'
import dotenv from 'dotenv';

dotenv.config()

export const send=async(req:Request, res:Response)=> {

    
    let {userAuth,passAuth,from,to,subject,html}=req.body

    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: userAuth,
            pass: passAuth
        }
    });

        let message = {
            from,
            to,
            subject,
            html
        }
        

        try {
            await transport.sendMail(message);
            res.json({status:'Email enviado',message})
            console.log('Enviado')
        }
        catch(err) {
            res.json({status:'Erro no envio do Email', err})
        }
}


