
import { Schema, model, Types } from 'mongoose';
import { IProject } from "../interfaces/projectInterface";
import { PROJECT_STATES } from '../config/constants';


const ProjectSchema = new Schema(
    {
        name: { type: String, required: true },
        client: { type: Schema.Types.ObjectId, ref: 'Client' },
        state: { type: String, enum: [PROJECT_STATES.INITIAL, PROJECT_STATES.IN_PROGRESS, PROJECT_STATES.COMPLETED, PROJECT_STATES.ON_HOLD, PROJECT_STATES.CANCELLED, PROJECT_STATES.ARCHIVED], default: PROJECT_STATES.INITIAL, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const ProjectModel = model<IProject>('Project', ProjectSchema);