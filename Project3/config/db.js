const mongoose = require("mongoose");

const dbConfig = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log("DB connected"))
        .catch(err => console.log("DB error:", err));
};
module.exports = dbConfig