import { IConceptType } from "../interfaces/conceptTypeInterface";
import { ConceptTypeModel } from "../models/conceptTypeModel";

export class ConceptTypeService {

    static validateConceptTypeData(conceptTypeData: Partial<IConceptType>): void {
        const errors = [];

        if (!conceptTypeData.name || conceptTypeData.name.trim().length < 3) {
            errors.push({ field: "name", message: "Name must be at least 3 characters long." });
        }
        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors));
        }
    }

    public static async getConceptTypes(): Promise<IConceptType[]> {
        const conceptTypes = await ConceptTypeModel.find({});
        return conceptTypes;
    }

    public static async getConceptTypeById(id: string): Promise<IConceptType | null> {
        const conceptType = await ConceptTypeModel.findById(id);
        return conceptType;
    }

    public static async createConceptType(conceptType: IConceptType): Promise<IConceptType> {

        this.validateConceptTypeData(conceptType);

        const newConceptType = new ConceptTypeModel(conceptType);
        await newConceptType.save();
        return newConceptType;
    }

    public static async updateConceptType(conceptType: IConceptType): Promise<IConceptType | null> {

        this.validateConceptTypeData(conceptType);

        const updatedConceptType = await ConceptTypeModel.findByIdAndUpdate(conceptType._id, conceptType);
        return updatedConceptType;
    }

    public static async deleteConceptType(id: string): Promise<IConceptType | null> {
        const deletedConceptType = await ConceptTypeModel.findByIdAndDelete(id);
        return deletedConceptType;
    }
}
