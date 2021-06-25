import dotenv from 'dotenv'
import express, { Request, Response } from "express";
import routes from './routes'
dotenv.config()

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5055;

const server = express()
server.use('/', routes)
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});