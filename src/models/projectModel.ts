
import { Schema, model, Types } from 'mongoose';
import { IProject } from "../interfaces/projectInterface";
const { PROJECT_STATES } = require('../config/constants');


const ProjectSchema = new Schema(
    {
        name: { type: String, required: true },
        client: { type: Schema.Types.ObjectId, ref: 'Client' },
        state: { type: String, enum: [PROJECT_STATES.ACTIVE, PROJECT_STATES.INACTIVE, PROJECT_STATES.SUSPENDED, PROJECT_STATES.REMOVED], default: PROJECT_STATES.ACTIVE },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const ProjectModel = model<IProject>('Project', ProjectSchema);