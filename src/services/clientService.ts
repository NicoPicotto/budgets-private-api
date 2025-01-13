import { IClient } from "../interfaces/clientInterface";
import { ClientModel } from "../models/clientModel";


export class ClientService {

    static validateClientData(clientData: Partial<IClient>): void {
        const errors = [];

        if (!clientData.name || clientData.name.trim().length < 3) {
            errors.push({ field: "name", message: "Name must be at least 3 characters long." });
        }

        if (!clientData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientData.email)) {
            errors.push({ field: "email", message: "A valid email is required." });
        }


        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors));
        }
    }

    static async createClient(clientData: Partial<IClient>): Promise<IClient> {

        this.validateClientData(clientData);

        const clientExists = await ClientModel.findOne({ email: clientData.email });
        if (clientExists) {
            throw new Error("Client already exists");
        }
        const newClient = new ClientModel(clientData);
        await newClient.save();
        return newClient;
    }

    static async updateClient(id: string, updateData: Partial<IClient>): Promise<IClient> {

        this.validateClientData(updateData);

        const updatedClient = await ClientModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedClient) {
            throw new Error("Error updating client");
        }
        return updatedClient;
    }

    static async getClients(): Promise<IClient[]> {
        return await ClientModel.find({});
    }

    static async getClientById(id: string): Promise<IClient | null> {
        return await ClientModel.findById(id);
    }

    static async deleteClient(id: string): Promise<IClient | null> {
        return await ClientModel.findByIdAndDelete(id);
    }
}
