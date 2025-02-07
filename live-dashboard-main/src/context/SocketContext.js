import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import config from "../config";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [trafficStats, setTrafficStats] = useState({
    totalFootTraffic: 0,
    frequentFootTraffic: 0,
    uniqueFootTraffic: 0,
    totalBus: 0,
    totalCar: 0,
    otherVehicles: 0,
  });
  const [emotionStats, setEmotionStats] = useState({
    totalEmotions: 0,
    totalGazing: 0,
    emotionBreakdown: {
      Joy: 0,
      Anger: 0,
      Sadness: 0,
      Disgust: 0,
      Surprise: 0,
      Neutral: 0,
    },
  });
  const [trafficGraph, setTrafficGraph] = useState([]);

  const [persons, setPersons] = useState([]);

  // useEffect(() => {
  //   const newSocket = io(config.API_URL);
  //   setSocket(newSocket);

  //   // Socket event listeners
  //   newSocket.on("trafficStats", (data) => {
  //     setTrafficStats(data);
  //   });
  //   newSocket.on("emotionStats", (data) => {
  //     setEmotionStats(data);
  //   });
  //   newSocket.on("trafficGraph", (data) => {
  //     setTrafficGraph(data);
  //   });

  //   newSocket.on("emotionCreated", (data) => {
  //     setEmotionStats((prev) => {
  //       const newStats = { ...prev };
  //       newStats.totalEmotions++;
  //       newStats.totalGazing++;
  //       if (data.gazing) {
  //         newStats.emotionBreakdown[data.emotionName]++;
  //       }
  //       return newStats;
  //     });
  //   });
  //   newSocket.on("trafficCreated", (data) => {
  //     setTrafficStats((prev) => {
  //       const newStats = { ...prev };
  //       if (data.category === "person") {
  //         newStats.totalFootTraffic++;
  //         // Logic for frequent and unique can be added based on your requirements
  //       } else if (data.category === "vehicle") {
  //         // Update vehicle counts based on specific vehicle type
  //         // This would need to be expanded based on your vehicle classification
  //         switch (data.vehicleType) {
  //           case "bus":
  //             newStats.totalBus++;
  //             break;
  //           case "car":
  //             newStats.totalCar++;
  //             break;
  //           default:
  //             newStats.otherVehicles++;
  //         }
  //       }
  //       return newStats;
  //     });
  //   });

  //   return () => newSocket.close();
  // }, []);

  useEffect(() => {
    const newSocket = io(config.API_URL);
    setSocket(newSocket);

    newSocket.on("trafficStats", (data) => {
      setTrafficStats((prevStats) => {
        if (JSON.stringify(prevStats) !== JSON.stringify(data)) {
          return data;
        }
        return prevStats;
      });
    });

    

    newSocket.on("emotionStats", (data) => {
      setEmotionStats((prevStats) => {
        if (JSON.stringify(prevStats) !== JSON.stringify(data)) {
          return data;
        }
        return prevStats;
      });
    });

    newSocket.on("trafficGraph", (data) => {
      setTrafficGraph((prevStats) => {
        if (JSON.stringify(prevStats) !== JSON.stringify(data)) {
          return data;
        }
        return prevStats;
      });
    });

    newSocket.on("trafficCreated", (data) => {
      setTrafficStats((prev) => {
        const newStats = { ...prev };
        if (data.category === "person") {
          newStats.totalFootTraffic++;
        }
        return newStats;
      });
    });

    newSocket.on("personsList", (data) => {
     
      setPersons((prevStats) => {
        if (JSON.stringify(prevStats) !== JSON.stringify(data)) {
          return data;
        }
        return prevStats;
      });

     
    });

    // Reset foot traffic at 00:00 AM
    const resetTrafficAtMidnight = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      if (hours === 0 && minutes === 0 && seconds === 0) {
        setTrafficStats((prev) => ({
          ...prev,
          totalFootTraffic: 0,
        }));
      }
    };

    const intervalId = setInterval(resetTrafficAtMidnight, 1000); // Check every second

    return () => {
      newSocket.close();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        trafficStats,
        emotionStats,
        trafficGraph,
        persons,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
