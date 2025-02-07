import { Schema, model } from "mongoose";

interface ITraffic {
  modelId: string;      // ID of tracking model (person/vehicle/emotion)
  cameraId: string;     // Unique camera identifier
  uniqueId: string;     // Auto-generated unique event ID
  category: 'person' | 'vehicle';  // Type of detection
  vehicleType?: 'bus' | 'car' | 'other';  // Type of vehicle if category is vehicle
  timestamp: Date;      // Auto-generated timestamp
}

const trafficSchema = new Schema<ITraffic>({
  modelId: {
    type: String,
    required: true,
  },
  cameraId: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
    default: () => Math.random().toString(36).substr(2, 9)  // Generate unique ID
  },
  category: {
    type: String,
    required: true,
    enum: ['person', 'vehicle']
  },
  vehicleType: {
    type: String,
    enum: ['bus', 'car', 'other']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Traffic = model<ITraffic>("Traffic", trafficSchema);
