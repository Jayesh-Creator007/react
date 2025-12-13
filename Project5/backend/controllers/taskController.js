const Task = require('../models/taskModel')

exports.store = async (req, res) => {
    const { category, title } = req.body
    await Task.create({ category, title })
    res.json({
        success: true,  
        message: "Task has been created"
    })
}

exports.index = async (req, res) => {
    await Task.find()
        .then((records) => {
            res.json({
                success: true,
                records
            })
        })
}

exports.trash = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({
                success: true,
                message: "Task has been Deleted"
            })
        })
        .catch((err) => console.log(err))
}

exports.update = async (req, res) => {
    const { id } = req.params
    const { category, title } = req.body
    await Task.findByIdAndUpdate(id, { category, title })
        .then(() => {
            res.json({
                success: true,
                message: "Task has been Updated"
            })
        })
}

exports.single = async (req, res) => {
    try {
        const { id } = req.params
        const record = await Task.findById(req.params.id);
        if (!record) {
            return res.json({ success: false, message: "Item not found" })
        }
        res.json({ success: true, record })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

};
