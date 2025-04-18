import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Project document
export interface IProject extends Document {
  contractorName: string;
  company: string;
  roofSize: number;
  roofType: 'Metal' | 'TPO' | 'Foam' | 'EPDM' | 'Modified Bitumen' | 'Asphalt Shingle' | 'Tile';
  projectCity: string;
  projectState: string;
  projectDate: Date;
  completed: boolean;
  energySavings: number;
  costSavings: number;
  temperatureReduction: number;
  installationDate?: Date;
  createdAt: Date;
}

// Create the Project schema
const ProjectSchema = new Schema<IProject>({
  contractorName: {
    type: String,
    required: [true, 'Contractor name is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  roofSize: {
    type: Number,
    required: [true, 'Roof size is required']
  },
  roofType: {
    type: String,
    required: [true, 'Roof type is required'],
    enum: ['Metal', 'TPO', 'Foam', 'EPDM', 'Modified Bitumen', 'Asphalt Shingle', 'Tile']
  },
  projectCity: {
    type: String,
    required: [true, 'Project city is required'],
    trim: true
  },
  projectState: {
    type: String,
    required: [true, 'Project state is required'],
    trim: true
  },
  projectDate: {
    type: Date,
    required: [true, 'Project date is required']
  },
  completed: {
    type: Boolean,
    default: false
  },
  energySavings: {
    type: Number,
    required: [true, 'Energy savings is required']
  },
  costSavings: {
    type: Number,
    required: [true, 'Cost savings is required']
  },
  temperatureReduction: {
    type: Number,
    required: [true, 'Temperature reduction is required']
  },
  installationDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Project model
export default mongoose.model<IProject>('Project', ProjectSchema);