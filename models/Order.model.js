import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema(
  {
    user: { type: Types.ObjectId, ref: "User" },
    OrderItems: [
      {
        product: { type: Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalOrderPrice: Number,
    shippingAddress: {
      city: String,
      street: String,
      phone: String,
    },
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      defult: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    PaidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt:Date
  },
  { timestamps: true, versionKey: false }
);

export const Order = mongoose.model("Order", schema);