const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: String,
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createDate: {
      type: Date,
      trim: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Games
module.exports = model('Game', gameSchema);
