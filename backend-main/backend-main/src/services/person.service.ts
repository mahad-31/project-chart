import { Person } from "../models/person.model"; // Import your person model
import { emitPersonsEvent, SOCKET_EVENTS } from "./socket.service";

export const calculateAndEmitPersons = async () => {
  try {
    // Fetch all persons from the database
    const allPersons = await Person.find({ 
       gender: { $ne: null }, 
       age: { $ne: null },
    });
    
    if (allPersons.length === 0) {
      console.log('No persons found in the database.');
      return;
    }
    else {
     // console.log('Persons found in the database.',allPersons);
    }
    // Emit the persons data to all connected clients
    emitPersonsEvent(SOCKET_EVENTS.PERSONS_LIST, allPersons);

    return allPersons;
  } catch (error) {
    console.error('Error fetching persons data:', error);
    throw error;
  }
};
