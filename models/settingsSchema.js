const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    guild: String,
    settings: {
        prefix: String,
        welcomeChannel: String,
        goodbyeChannel: String,
    },
});

module.exports = mongoose.model("settings", settingsSchema);
