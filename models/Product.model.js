import mongoose, { Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const schema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [30, "too short product description"],
      maxLength: [20000, "too long product description"],
    },
    imageCover: String,
    images: [String],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: { type: Number, default: 0 },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    brand: {
      type: Types.ObjectId,
      ref: "brand",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
schema.post("init", function (doc) {
  if (doc.imageCover) {
    doc.imageCover = `https://res.cloudinary.com/dthsq3uel/image/upload/products/${doc.imageCover}`;
  }

  if (Array.isArray(doc.images)) {
    doc.images = doc.images.map(
      (img) =>
        `https://res.cloudinary.com/dthsq3uel/image/upload/products/${img}`
    );
  }
});

export const Product = mongoose.model("Product", schema);
