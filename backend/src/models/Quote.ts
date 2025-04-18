import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Quote document
export interface IQuote extends Document {
  contractorName: string;
  company: string;
  roofSize: number;
  roofType: 'Metal' | 'TPO' | 'Foam' | 'EPDM' | 'Modified Bitumen' | 'Asphalt Shingle' | 'Tile';
  projectCity: string;
  projectState: string;
  projectDate: Date;
  submittedAt: Date;
}

// Create the Quote schema
const QuoteSchema = new Schema<IQuote>({
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
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Quote model
export default mongoose.model<IQuote>('Quote', QuoteSchema);