import { IConcept } from "../interfaces/conceptInterface";
import { ConceptModel } from "../models/conceptModel";

export class ConceptService {

    static validateConceptData(conceptData: Partial<IConcept>): void {
        const errors = [];

        if (!conceptData.name || conceptData.name.trim().length < 3) {
            errors.push({ field: "name", message: "Name must be at least 3 characters long." });
        }

        if (conceptData.costPrice === undefined || conceptData.costPrice < 0) {
            errors.push({ field: "costPrice", message: "Cost price must be a non-negative number." });
        }

        if (conceptData.amountHours !== undefined && conceptData.amountHours < 0) {
            errors.push({ field: "amountHours", message: "amountHours must be a non-negative number." });
        }

        if (conceptData.conceptType && typeof conceptData.conceptType !== "string") {
            errors.push({ field: "conceptType", message: "Concept type must be a valid ID." });
        }

        if (conceptData.resourceType && typeof conceptData.resourceType !== "string") {
            errors.push({ field: "resourceType", message: "Resource type must be a valid ID." });
        }

        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors));
        }
    }

    public static async getConcepts(): Promise<IConcept[]> {
        const concepts = await ConceptModel.find({})
            .populate("conceptType")
            .populate("resourceType");
        return concepts;
    }

    public static async getConceptById(id: string): Promise<IConcept | null> {
        const concept = await ConceptModel.findById(id)
            .populate("conceptType")
            .populate("resourceType");
        return concept;
    }

    public static async createConcept(concept: IConcept): Promise<IConcept> {
        this.validateConceptData(concept);

        const newConcept = new ConceptModel(concept);
        await newConcept.save();

        const populatedConcept = await ConceptModel.findById(newConcept._id)
            .populate("conceptType")
            .populate("resourceType")
            .exec();

        if (!populatedConcept) {
            throw new Error("Error populating concept after creation.");
        }

        return populatedConcept;
    }

    public static async updateConcept(id: string, conceptData: Partial<IConcept>): Promise<IConcept | null> {
        this.validateConceptData(conceptData);

        const updatedConcept = await ConceptModel.findByIdAndUpdate(id, conceptData, {
            new: true,
            runValidators: true,
        })
            .populate("conceptType")
            .populate("resourceType");

        return updatedConcept;
    }

    public static async deleteConcept(id: string): Promise<IConcept | null> {
        const deletedConcept = await ConceptModel.findByIdAndDelete(id);
        return deletedConcept;
    }
}
