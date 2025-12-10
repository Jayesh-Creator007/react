const express = require("express");
const app = express();
const PORT =process.env.PORT || 8000
require("dotenv").config();

const connectDB = require("./config/db");
connectDB(); 

const mongoose = require("mongoose");


const APISchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    taskTime: { type: String, required: true }
});

const Task = mongoose.model("Task", APISchema);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("API is runnign"));


app.post("/api/taskapi", async (req, res) => {
    try {
        const { taskName, taskTime } = req.body;

        if (!taskName || !taskTime) {
            return res.send("taskName and taskTime are required");
        }

        await Task.create({ taskName, taskTime });
        res.send("Task added");

    } catch (error) {
        res.send(error.message);
    }
});



app.get("/api/taskapi", async (req, res) => {
    const data = await Task.find();
    res.send({ success: true, data });
});



app.get("/api/taskapi/:id", async (req, res) => {
    try {
        const data = await Task.findById(req.params.id);
        if (!data) return res.send("Task not found");

        res.send({ success: true, data });
    } catch (error) {
        res.send(" id not found");
    }
});



app.put("/api/taskapi/:id", async (req, res) => {
    try {
        const updated = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) return res.send("Task not found");

        res.send("Task updated");

    } catch (error) {
        res.send("Invalid ID");
    }
});




app.delete("/api/taskapi/:id", async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);

        if (!deleted) return res.send("Task not found");

        res.send("Task deleted");

    } catch (error) {
        res.send("Invalid ID");
    }
});


app.listen(PORT, () =>
    console.log(`http://localhost:${PORT}`)
);
