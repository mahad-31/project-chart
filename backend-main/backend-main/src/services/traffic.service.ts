import { Traffic } from "../models/traffic.model";
import { emitTrafficEvent, SOCKET_EVENTS } from "./socket.service";

interface TrafficStats {
  totalFootTraffic: number;
  frequentFootTraffic: number;
  uniqueFootTraffic: number;
  totalBus: number;
  totalCar: number;
  otherVehicles: number;
}

export const calculateAndEmitTrafficStats = async () => {
  try {
    // Get all traffic (removed date filtering)
    const allTraffic = await Traffic.find({});

    // Calculate stats
    const stats: TrafficStats = {
      totalFootTraffic: 0,
      frequentFootTraffic: 0,
      uniqueFootTraffic: 0,
      totalBus: 0,
      totalCar: 0,
      otherVehicles: 0
    };

    // Count total foot traffic
    const personTraffic = allTraffic.filter(t => t.category === 'person');
    stats.totalFootTraffic = personTraffic.length;

    // Calculate unique foot traffic (based on modelId)
    const uniqueModelIds = new Set(personTraffic.map(t => t.modelId));
    stats.uniqueFootTraffic = uniqueModelIds.size;

    // Calculate frequent foot traffic (appeared more than once)
    const modelIdCounts = personTraffic.reduce((acc, curr) => {
      acc[curr.modelId] = (acc[curr.modelId] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    stats.frequentFootTraffic = Object.values(modelIdCounts).filter(count => count > 1).length;

    // Count vehicles
    const vehicleTraffic = allTraffic.filter(t => t.category === 'vehicle');
    vehicleTraffic.forEach(vehicle => {
      switch (vehicle.vehicleType) {
        case 'bus':
          stats.totalBus++;
          break;
        case 'car':
          stats.totalCar++;
          break;
        default:
          stats.otherVehicles++;
      }
    });

    // Emit stats through socket
    emitTrafficEvent(SOCKET_EVENTS.TRAFFIC_STATS, stats);

    return stats;
  } catch (error) {
    console.error('Error calculating traffic stats:', error);
    throw error;
  }
};

// Set up interval to update stats every minute
export const startTrafficStatsUpdates = () => {
  // Initial calculation
  calculateAndEmitTrafficStats();

  // Update every minute
  setInterval(calculateAndEmitTrafficStats, 60000);
};
