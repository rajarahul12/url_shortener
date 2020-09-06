const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlsCreated: Number,
  urlHits: Number,
  name: String,
});

module.exports = mongoose.model("UrlInfo", urlSchema);
