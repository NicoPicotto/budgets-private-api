import { IProject } from "../interfaces/projectInterface";
import { ProjectModel } from "../models/projectModel";
import { PROJECT_STATES } from '../config/constants';

export class ProjectService {

    static validateProjectData(projectData: Partial<IProject>): void {
        const errors = [];

        if (!projectData.name || projectData.name.trim().length < 3) {
            errors.push({ field: "name", message: "Name must be at least 3 characters long." });
        }

        if (projectData.state && !Object.values(PROJECT_STATES).includes(projectData.state as any)) {
            errors.push({ field: "state", message: "State must be a valid project state." });
        }

        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors));
        }
    }

    public static async getProjects(): Promise<IProject[]> {
        const projects = await ProjectModel.find({}).populate("client");
        return projects;
    }

    public static async getProjectById(id: string): Promise<IProject | null> {
        const project = await ProjectModel.findById(id).populate("client");
        return project;
    }

    public static async createProject(projectData: IProject): Promise<IProject> {
        this.validateProjectData(projectData);

        const newProject = new ProjectModel(projectData);
        await newProject.save();

        const populatedProject = await ProjectModel.findById(newProject._id)
            .populate("client")
            .exec();

        if (!populatedProject) {
            throw new Error("Error populating concept after creation.");
        }

        return populatedProject;
    }

    public static async updateProject(id: string, projectData: Partial<IProject>): Promise<IProject | null> {
        this.validateProjectData(projectData);

        const updatedProject = await ProjectModel.findByIdAndUpdate(id, projectData, {
            new: true,
            runValidators: true,
        }).populate("client");

        return updatedProject;
    }

    public static async deleteProject(id: string): Promise<IProject | null> {
        const deletedProject = await ProjectModel.findByIdAndDelete(id);
        return deletedProject;
    }
}
