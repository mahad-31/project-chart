import { Schema, model } from "mongoose";

interface IEmotion {
  id: string;           // Unique identifier
  emotionName: string;  // Name of the emotion
  gazing: boolean;       // Whether the person is gazing
  timestamp: Date;      // Auto-generated timestamp
}

const emotionSchema = new Schema<IEmotion>({
  id: {
    type: String,
    required: true,
  },
  emotionName: {
    type: String,
    required: true
  },
  gazing: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Emotion = model<IEmotion>("Emotion", emotionSchema);
