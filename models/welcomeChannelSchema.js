const mongoose = require("mongoose");

const welcomeChannelSchema = new mongoose.Schema({
    guild: String,
    channel: String,
});

module.exports = mongoose.model("welcomeChannel", welcomeChannelSchema);
