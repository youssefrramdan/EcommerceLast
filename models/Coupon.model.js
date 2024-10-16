import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: { type: String, required: true },
    expires: { type: Date, required: true, index: { expires: 0 } }, // TTL index
    discount: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Coupon = mongoose.model('Coupon', couponSchema);