import Qualification from "../models/qualification.model.js";

export const createQualification = async (req, res) => {
  try {
    const data = new Qualification(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getQualifications = async (req, res) => {
  try {
    const data = await Qualification.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQualificationById = async (req, res) => {
  try {
    const data = await Qualification.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Qualification not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateQualification = async (req, res) => {
  try {
    const data = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: "Qualification not found" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteQualification = async (req, res) => {
  try {
    await Qualification.findByIdAndDelete(req.params.id);
    res.json({ message: "Qualification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAllQualifications = async (req, res) => {
  try {
    await Qualification.deleteMany();
    res.json({ message: "All qualifications deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
