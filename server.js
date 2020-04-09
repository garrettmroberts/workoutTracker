const express = require('express');
const mongoose = require('mongoose');

//Initializes app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets static directory
app.use(express.static("public"));

// connects HTML Routes
const htmlRoutes = require('./routes/htmlroutes');
app.use(htmlRoutes);

// Connects API Routes
const apiRoutes = require('./routes/apiroutes');
app.use(apiRoutes);

// Connect to MongoDB
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workouts', options);

// Set app to listen on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening at http://localhost:' + PORT))