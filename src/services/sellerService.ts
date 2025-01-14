import { ISeller } from "../interfaces/sellerInterface";
import { SellerModel } from "../models/sellerModel";

export class SellerService {

    static validateSellerData(sellerData: Partial<ISeller>): void {
        const errors = [];

        if (!sellerData.name || sellerData.name.trim().length < 3) {
            errors.push({ field: "name", message: "Name must be at least 3 characters long." });
        }
        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors));
        }
    }

    public static async getSellers(): Promise<ISeller[]> {
        const sellers = await SellerModel.find({});
        return sellers;
    }

    public static async getSellerById(id: string): Promise<ISeller | null> {
        const seller = await SellerModel.findById(id);
        return seller;
    }

    public static async createSeller(seller: ISeller): Promise<ISeller> {

        this.validateSellerData(seller);

        const newSeller = new SellerModel(seller);
        await newSeller.save();
        return newSeller;
    }

    public static async updateSeller(seller: ISeller): Promise<ISeller | null> {

        this.validateSellerData(seller);

        const updatedSeller = await SellerModel.findByIdAndUpdate(seller._id, seller);
        return updatedSeller;
    }

    public static async deleteSeller(id: string): Promise<ISeller | null> {
        const deletedSeller = await SellerModel.findByIdAndDelete(id);
        return deletedSeller;
    }
}
