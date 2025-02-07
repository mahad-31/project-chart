import { Request, Response } from "express";
import { Emotion } from "../models/emotion.model";
import { emitTrafficEvent, SOCKET_EVENTS } from "../services/socket.service";

// Create new emotion entry
export const createEmotion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, emotionName, gazing } = req.body;

    // Validate request body
    if (!id || !emotionName) {
      res.status(400).json({
        success: false,
        message: "id and emotionName are required",
      });
      return;
    }

    // Create new emotion entry
    const emotion = new Emotion({
      id,
      emotionName,
      gazing
    });

    await emotion.save();

    // Emit socket event for creation
    emitTrafficEvent(SOCKET_EVENTS.EMOTION_CREATED, emotion);

    res.status(201).json({
      success: true,
      message: "Emotion entry created successfully",
      data: emotion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all emotion entries
export const getAllEmotions = async (req: Request, res: Response): Promise<void> => {
  try {
    const emotions = await Emotion.find().sort({ timestamp: -1 });

    // Emit socket event for list
    emitTrafficEvent(SOCKET_EVENTS.EMOTION_LIST, emotions);

    res.status(200).json({
      success: true,
      data: emotions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
