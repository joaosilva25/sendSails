import express, {Request, Response} from 'express';
import dotenv from 'dotenv'
import path from 'path';
import mainRoutes from './routes/api'
import cors from 'cors'


dotenv.config()

const server = express();

server.use(cors())

server.use(express.static(path.join(__dirname,'../public')));
server.use(express.urlencoded({extended:true}));

server.use(mainRoutes);


server.use((req:Request,res:Response) => {
    res.status(404)
    res.json({status:'Endpoint não encontrado'})
})

server.listen(process.env.PORT)