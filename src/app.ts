import dotenv from 'dotenv'
import express, { Request, Response, urlencoded } from "express";
import cors from 'cors'
import routes from './routes'
import Mongoose from 'mongoose'
import formData from "express-form-data";
dotenv.config({})

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5050;

const server = express()
server.use('/static', express.static('files'))
server.use(cors())
server.use(express.urlencoded({
    extended: false
}))
server.use(express.json())
server.use(formData.parse());
server.use(formData.union());
server.use(routes)
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

Mongoose.connect('mongodb+srv://admin:icui4cua@cluster0.emxzy.mongodb.net/ndeva_blog?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is running!");
})
    .catch(err => console.log(err));