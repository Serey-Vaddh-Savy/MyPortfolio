import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  message: String,
});

// Allow admin to submit simply "name"
contactSchema.pre("save", function (next) {
  if (this.name && !this.firstname) {
    const parts = this.name.trim().split(" ");
    this.firstname = parts[0];
    this.lastname = parts.slice(1).join(" ") || "";
  }
  next();
});

export default mongoose.model("Contact", contactSchema);
