
import { Schema, model } from 'mongoose';
import { ISeller } from "../interfaces/sellerInterface";

const SellerSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const SellerModel = model<ISeller>("Seller", SellerSchema);
