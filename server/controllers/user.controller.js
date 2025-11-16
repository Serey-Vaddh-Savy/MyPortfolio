import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user"
    });

    return res.status(200).json({ message: "Successfully created", user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const list = async (req, res) => {
  try {
    const users = await User.find().select("name email role createdAt updatedAt");
    res.json(users);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const read = (req, res) => {
  const user = req.profile;
  user.password = undefined;
  res.json(user);
};

export const update = async (req, res) => {
  try {
    let user = req.profile;

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    Object.assign(user, req.body);
    await user.save();

    user.password = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const user = req.profile;
    await user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "User not found" });

    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Could not retrieve user" });
  }
};
