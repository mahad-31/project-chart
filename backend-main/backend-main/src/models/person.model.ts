import { Schema, model } from "mongoose";

interface IPerson {
  modelId: string;
  age?: string | number | null; 
  gender?: 'Male' | 'Female' | 'Other' | null; 
  timestamp: Date;
}

const personSchema = new Schema<IPerson>({
  modelId: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Person = model<IPerson>("Person", personSchema);
