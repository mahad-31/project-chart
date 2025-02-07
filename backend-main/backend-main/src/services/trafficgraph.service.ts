import { Traffic } from "../models/traffic.model";
import { emitTrafficEvent, SOCKET_EVENTS } from "./socket.service";


export const calculateTrafficGraphData = async () => {
    try {
        const allTraffic = await Traffic.find({});
        console.log("allTraffic");
        emitTrafficEvent(SOCKET_EVENTS.TRAFFIC_GRAPH, allTraffic);
        return allTraffic;
    } catch (error) {
        console.error('Error calculating traffic stats:', error);
        throw error;
    }
};

// Set up interval to update stats every minute
export const startTrafficStatsUpdates = () => {
    // Initial calculation
    calculateTrafficGraphData();

    // Update every minute
    setInterval(calculateTrafficGraphData, 60000);
};
