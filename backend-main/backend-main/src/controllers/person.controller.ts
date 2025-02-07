import { Request, Response } from "express";
import { Person } from "../models/person.model";
import { SOCKET_EVENTS, emitPersonsEvent } from "../services/socket.service";

// Create new person
export const createPerson = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const person = new Person(req.body);
    await person.save();
    
    const allPersons = await Person.find({
      gender: { $ne: null },
      age: { $ne: null },
    });

    emitPersonsEvent(SOCKET_EVENTS.PERSONS_CREATED, person);
    emitPersonsEvent(SOCKET_EVENTS.PERSONS_LIST, allPersons);
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ message: "Error creating person", error });
  }
};

// Get all persons
export const getAllPersons = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const persons = await Person.find({
      gender: { $ne: null },
      age: { $ne: null },
    });
    emitPersonsEvent(SOCKET_EVENTS.PERSONS_LIST, persons);
 
    res.status(200).json(persons);
  } catch (error) {
    res.status(400).json({ message: "Error fetching persons", error });
  }
};

// Get person by modelId
export const getPersonByModelId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const person = await Person.findOne({ modelId: req.params.modelId });
    if (!person) {
      res.status(404).json({ message: "Person not found" });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ message: "Error fetching person", error });
  }
};

// Update person
export const updatePerson = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const person = await Person.findOneAndUpdate(
      { modelId: req.params.modelId },
      req.body,
      { new: true }
    );
    if (!person) {
      res.status(404).json({ message: "Person not found" });
      return;
    }
    const allPersons = await Person.find({
      gender: { $ne: null },
      age: { $ne: null },
    });

    emitPersonsEvent(SOCKET_EVENTS.PERSONS_UPDATED, req.params.modelId);
    emitPersonsEvent(SOCKET_EVENTS.PERSONS_LIST, allPersons);

    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ message: "Error updating person", error });
  }
};

// Delete person
export const deletePerson = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const person = await Person.findOneAndDelete({
      modelId: req.params.modelId,
    });
    if (!person) {
      res.status(404).json({ message: "Person not found" });
      return;
    }
    const allPersons = await Person.find({
      gender: { $ne: null },
      age: { $ne: null },
    });

    emitPersonsEvent(SOCKET_EVENTS.PERSONS_DELETED, req.params.modelId);
    emitPersonsEvent(SOCKET_EVENTS.PERSONS_LIST, allPersons);
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting person", error });
  }
};
