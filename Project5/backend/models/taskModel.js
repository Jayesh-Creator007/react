const { Schema, model } = require("mongoose")

const taskSchema = new Schema({
    category: {
        type: String,
        trim: true,
        required: [true, "Category required"]
    },
    title: {
        type: String,
        trim: true,
        required: [true, "title required"]
    }
})

const Task = model('Task', taskSchema);

module.exports = Task