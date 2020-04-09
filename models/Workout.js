const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;