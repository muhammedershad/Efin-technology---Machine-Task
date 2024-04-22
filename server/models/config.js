require("dotenv").config();
const mongoose = require("mongoose");

// MongoDB Configuration
let connect = () => {
    const mongoURI = process.env.MONGODB_URL;
    mongoose
        .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
};

module.exports = connect