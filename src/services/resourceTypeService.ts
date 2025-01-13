import { IResourceType } from "../interfaces/resourceTypeInterface";
import { ResourceTypeModel } from "../models/resourceTypeModel";

export class ResourceTypeService {

    static validateResourceTypeData(resourceTypeData: Partial<IResourceType>): void {
        const errors = [];

        if (!resourceTypeData.name || resourceTypeData.name.trim().length < 3) {
            errors.push({ field: "name", message: "Name must be at least 3 characters long." });
        }
        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors));
        }
    }

    public static async getResourceTypes(): Promise<IResourceType[]> {
        const resourceTypes = await ResourceTypeModel.find({});
        return resourceTypes;
    }

    public static async getResourceTypeById(id: string): Promise<IResourceType | null> {
        const resourceType = await ResourceTypeModel.findById(id);
        return resourceType;
    }

    public static async createResourceType(resourceType: IResourceType): Promise<IResourceType> {

        this.validateResourceTypeData(resourceType);

        const newResourceType = new ResourceTypeModel(resourceType);
        await newResourceType.save();
        return newResourceType;
    }

    public static async updateResourceType(resourceType: IResourceType): Promise<IResourceType | null> {

        this.validateResourceTypeData(resourceType);

        const updatedResourceType = await ResourceTypeModel.findByIdAndUpdate(resourceType._id, resourceType);
        return updatedResourceType;
    }

    public static async deleteResourceType(id: string): Promise<IResourceType | null> {
        const deletedResourceType = await ResourceTypeModel.findByIdAndDelete(id);
        return deletedResourceType;
    }
}
