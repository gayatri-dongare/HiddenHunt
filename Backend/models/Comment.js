const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

  text: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  gem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gem",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Comment", commentSchema);