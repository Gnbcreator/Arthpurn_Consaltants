import mongoose from 'mongoose'


export const connectDB = async (params) => {

    try {
        const user = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\n mongodb connected ${user.connection.host}`)
    } catch (error) {
        console.log('error')
        process.exit(1);
    }

}

