import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your backend URL

const PersonsList = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    socket.on("personsList", (data) => {
      console.log("Received persons data on frontend:", data); // Debugging log
      setPersons(data);
    });

    return () => {
      socket.off("personsList"); // Cleanup on unmount
    };
  }, []);

  return (
    <div>
      <h2>Persons List</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name} - {person.age} years old</li>
        ))}
      </ul>
    </div>
  );
};

export default PersonsList;
