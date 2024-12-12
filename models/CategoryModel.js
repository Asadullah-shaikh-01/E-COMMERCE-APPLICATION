import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    slug:{
        type:String,
        lowercaes:true,
    }
} 
);

export default mongoose.model("Category", categorySchema);
