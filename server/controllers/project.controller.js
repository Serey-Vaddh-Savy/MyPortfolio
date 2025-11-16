// server/controllers/project.controller.js
import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
  console.log(" PROJECT POST RECEIVED");
  console.log("BODY:", req.body);

  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      info: req.body.info
    });

    await project.save();
    return res.status(201).json(project);

  } catch (err) {
    console.log("❌ ERROR:", err);
    return res.status(400).json({ message: err.message });
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
    const data = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

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
