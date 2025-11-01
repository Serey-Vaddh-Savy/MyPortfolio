import User from "../models/user.model.js";

export const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully created"
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message
    });
  }
};

export const list = async (req, res) => {
  try {
    let users = await User.find().select("name email created updated");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      message: err.message
    });
  }
};

export const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

export const update = async (req, res) => {
  try {
    let user = req.profile;
    user = Object.assign(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      message: err.message
    });
  }
};

export const remove = async (req, res) => {
  try {
    let user = req.profile;
    await user.deleteOne();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(400).json({
      message: err.message
    });
  }
};

export const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        message: "User not found"
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Could not retrieve user"
    });
  }
};
