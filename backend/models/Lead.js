const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const leadSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  roomType: {
    type: String,
    enum: ["Kitchen", "Living Room", "Bedroom", "Bathroom", "Office"],
    required: true,
  },
  estimatedBudget: Number,
  status: {
    type: String,
    default: "New",
    enum: ["New", "Contacted", "Converted"],
  },
  notes: [noteSchema],
  lastNoteAddedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lead", leadSchema);
