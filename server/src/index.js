import dotenv from 'dotenv'
import { connectDB } from './db/index.js'
import { shocketServer } from "./shockets/serverSocket.js";
import { app } from './app.js';

dotenv.config({ path: './.env' })

const {httpServer} = shocketServer(app);

connectDB().then(() => {
    httpServer.listen(process.env.PORT || 5000, () => {
        console.log(`SERVER IS RUNNING ON THE PORT ${process.env.PORT || 5000}`)
    })
}).catch((err) => {
    console.log('Mongodb Connection faild !!!')
})