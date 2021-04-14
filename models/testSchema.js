const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    userID: String,
    GuildID: String,
    coins: String,
});

module.exports = mongoose.model("something", testSchema);
