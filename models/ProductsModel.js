import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Brand: {
        type: String,
        required: true,
      },
    slug: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Photo: {
      data: Buffer,
      contentType: String,
    },
    Shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);