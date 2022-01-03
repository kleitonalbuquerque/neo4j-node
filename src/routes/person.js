import { Router } from "express";
import personModel from "../models/person";

const person = Router();

person.get("/", async (req, res) => {
  const result = await personModel.findAll();
  res.json(result);
});

person.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = await personModel.findById(id);
  res.json(result);
});

person.post("/", async (req, res) => {
  const result = await personModel.create(req.body);
  res.json(result);
});

person.put("/:id", async (req, res) => {
  const result = await personModel.findByIdAndUpdate(req.params.id, req.body);
  res.json(result);
});

person.delete("/:id", async (req, res) => {
  const result = await personModel.findByIdAndDelete(req.params.id, req.body);
  res.json(result);
});

export default person;
