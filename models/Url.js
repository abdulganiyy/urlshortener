const { model, Schema } = require("mongoose");

const urlSchema = new Schema({
  urlCode: String,
  shortUrl: String,
  longUrl: String,
});

module.exports = model("Url", urlSchema);
