import { Request, Response } from "express";
import { Traffic } from "../models/traffic.model";
import { emitTrafficEvent, SOCKET_EVENTS } from "../services/socket.service";
import { calculateAndEmitTrafficStats } from "../services/traffic.service";

// Create new traffic entry
export const createTraffic = async (req: Request, res: Response): Promise<void> => {
  try {
    const { modelId, cameraId, category, vehicleType } = req.body;

    // Validate request body
    if (!modelId || !cameraId || !category) {
      res.status(400).json({
        success: false,
        message: "modelId, cameraId, and category are required",
      });
      return;
    }

    // Validate category
    if (!['person', 'vehicle'].includes(category)) {
      res.status(400).json({
        success: false,
        message: "Category must be either 'person' or 'vehicle'",
      });
      return;
    }

    // Create new traffic entry
    const traffic = new Traffic({
      modelId,
      cameraId,
      category,
      vehicleType
    });

    await traffic.save();
    let allTraffic = await Traffic.find({});
    // Emit socket event for creation and recalculate stats
    emitTrafficEvent(SOCKET_EVENTS.TRAFFIC_CREATED, traffic);
    emitTrafficEvent(SOCKET_EVENTS.TRAFFIC_GRAPH, allTraffic);
    await calculateAndEmitTrafficStats();

    res.status(201).json({
      success: true,
      message: "Traffic entry created successfully",
      data: traffic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all traffic entries
export const getAllTraffic = async (req: Request, res: Response): Promise<void> => {
  try {
    const traffic = await Traffic.find().sort({ timestamp: -1 });

    // Emit socket event for list
    emitTrafficEvent(SOCKET_EVENTS.TRAFFIC_LIST, traffic);

    res.status(200).json({
      success: true,
      data: traffic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get traffic entry by ID
export const getTrafficById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const traffic = await Traffic.findById(id);

    if (!traffic) {
      res.status(404).json({
        success: false,
        message: "Traffic entry not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: traffic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update traffic entry
export const updateTraffic = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { modelId, cameraId, category, vehicleType } = req.body;

    // Validate category if provided
    if (category && !['person', 'vehicle'].includes(category)) {
      res.status(400).json({
        success: false,
        message: "Category must be either 'person' or 'vehicle'",
      });
      return;
    }

    const traffic = await Traffic.findByIdAndUpdate(
      id,
      { modelId, cameraId, category, vehicleType },
      { new: true, runValidators: true }
    );

    if (!traffic) {
      res.status(404).json({
        success: false,
        message: "Traffic entry not found",
      });
      return;
    }

    // Emit socket event for update
    emitTrafficEvent(SOCKET_EVENTS.TRAFFIC_UPDATED, traffic);

    res.status(200).json({
      success: true,
      message: "Traffic entry updated successfully",
      data: traffic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete traffic entry
export const deleteTraffic = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const traffic = await Traffic.findByIdAndDelete(id);

    if (!traffic) {
      res.status(404).json({
        success: false,
        message: "Traffic entry not found",
      });
      return;
    }

    // Emit socket event for deletion
    emitTrafficEvent(SOCKET_EVENTS.TRAFFIC_DELETED, id);

    res.status(200).json({
      success: true,
      message: "Traffic entry deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
