require("dotenv").config();

const mongoose = require("mongoose");

module.exports = async () => {
    await mongoose.connect(process.env.MONGO_PATH, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    return mongoose;
};
