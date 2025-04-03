import dotenv from 'dotenv'
import { app } from './app.js'
import { connectDB } from './db/index.js'

dotenv.config({path: './.env'})

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`SERVER IS RUNNING ON THE PORT ${process.env.PORT || 5000}`)
    })
}).catch((err) => {
    console.log('Mongodb Connection faild !!!')
})