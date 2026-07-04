require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");


const resumeRoutes = require("./routes/resumeRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/resumes", resumeRoutes);
app.use("/api/users", userRoutes);


connectDB();

app.get("/", (req, res)=>{
    res.send("AI resume builder Backend is running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log (`Server is runnig on port ${PORT}`);
});