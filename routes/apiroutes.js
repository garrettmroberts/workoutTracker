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
      res.send(err);
    } else {
      res.send(result)
    };
  });
});

// Returns all workouts within a given range
router.get('/api/workouts/:range', ({ params }, res) => {
  db.workouts.find({}, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result)
    }
  })
});

module.exports = router;