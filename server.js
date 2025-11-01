import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";


const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);



mongoose.connect("mongodb+srv://ssavy_db_user:Monetrack18112006@cluster0.henraqv.mongodb.net/?appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Connection Error:", err));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

app.use((err, req, res, next) => {
 if (err.name === 'UnauthorizedError') {
   res.status(401).json({ error: err.name + ": " + err.message })
 }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


