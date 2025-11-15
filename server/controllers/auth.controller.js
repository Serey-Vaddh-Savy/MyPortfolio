import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../../config/config.js";

// ------------------ SIGN UP ------------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPass
    });

    return res.json({ message: "Signup successful", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Signup failed" });
  }
};

// ------------------ SIGN IN ------------------
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: "Email and password do not match." });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.jwtSecret,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not sign in" });
  }
};

// ------------------ SIGN OUT ------------------
export const signout = (req, res) => {
  return res.json({ message: "Signed out" });
};
