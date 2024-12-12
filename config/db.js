import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongoose ${conn.connection.host}`);
        console.log(`Connected to Database `);
    }catch(error){
      console.log(`Error in mongoose ${error}`);
    }
};

export default connectDB;