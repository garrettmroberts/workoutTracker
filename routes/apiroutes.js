const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

const databaseUrl = 'workout';
const collection = ['workouts'];

const db = mongojs(databaseUrl, collection);

// Returns all workouts
router.get('/api/workouts', (req, res) => {
  db.workouts.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.json(data)
    };
  });
});

// Adds a new exercise to workout with a given id
router.put('/api/workouts/:id', (req, res) => {
  db.workouts.updateOne({
    _id: mongojs.ObjectId(req.params.id)
  },
  {
    $push: {
      exercises: req.body
    }
  },
  (err, data) => {
    console.log(req.body)
    res.send(data)
  });
});

// Creates a new workout
router.post('/api/workouts', ({ body }, res) => {
  const workout = body;
  body.day = new Date().setDate(new Date().getDate());
  db.workouts.insert(workout, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result)
    };
  });
});

router.get('/api/workouts/:range', (req, res) => {
});

module.exports = router;