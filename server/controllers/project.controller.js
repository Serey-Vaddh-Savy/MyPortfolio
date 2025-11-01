import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const data = new Project(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const data = await Project.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const data = await Project.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Project not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const data = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ message: "Project not found" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany();
    res.json({ message: "All projects deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
