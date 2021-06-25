import dotenv from 'dotenv'
import express, { Request, Response, urlencoded } from "express";
import cors from 'cors'
import routes from './routes'
import Mongoose from 'mongoose'

dotenv.config()

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5055;

const server = express()
server.use(express.json())
server.use(urlencoded({
    extended: true
}))
server.use(cors())
server.use(routes)
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

Mongoose.connect('mongodb://localhost:27017/ndeva_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is running!");
})
.catch(err => console.log(err));