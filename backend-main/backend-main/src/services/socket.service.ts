import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { calculateAndEmitTrafficStats } from "../services/traffic.service";
import { calculateAndEmitEmotionStats } from "../services/emotion.service";
import { calculateTrafficGraphData } from "./trafficgraph.service";
import { calculateAndEmitPersons } from "./person.service";
import { createPerson } from "../controllers/person.controller";
import { Request, Response } from "express";

let io: SocketServer;

export const initializeSocket = (server: HttpServer): void => {
  io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Calculate and send initial traffic stats when client connects
    calculateAndEmitTrafficStats();
    calculateAndEmitEmotionStats();
    calculateTrafficGraphData();
    calculateAndEmitPersons(); 

    socket.on("personsCreated", async (data) => {
      console.log("New person data received:", data);
      const req = { body: data } as Request;
      const res = {
          status: (code: number) => ({
              json: (response: any) => console.log("Response:", response)
          })
      } as unknown as Response;

      // Call createPerson function with mock req and res
      const response = await createPerson(req, res);
      console.log("New person response received:", response);
  });



    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export const emitTrafficEvent = (event: string, data: any): void => {
  if (io) {
    io.emit(event, data);
  }
};
export const emitEmotionEvent = (event: string, data: any): void => {
  if (io) {
    io.emit(event, data);
  }
};
export const emitTrafficGraphEvent = (event: string, data: any): void => {
  if (io) {
    io.emit(event, data);
  }
};

export const emitPersonsEvent = (event: string, data: any): void => {
  if (io) {
    io.emit(event, data);  // Emit person-related event to all clients
  }
};
// Socket events
export const SOCKET_EVENTS = {
  TRAFFIC_CREATED: "trafficCreated",
  TRAFFIC_UPDATED: "trafficUpdated",
  TRAFFIC_DELETED: "trafficDeleted",
  TRAFFIC_LIST: "trafficList",
  TRAFFIC_STATS: "trafficStats",
  EMOTION_CREATED: "emotionCreated",
  EMOTION_LIST: "emotionList",
  EMOTION_STATS: "emotionStats",
  TRAFFIC_GRAPH: "trafficGraph",
  PERSONS_LIST: "personsList", 
  PERSONS_CREATED: "personsCreated", 
  PERSONS_DELETED: "personsDeleted", 
  PERSONS_UPDATED: 'personsUpdated',
};
