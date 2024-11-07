const express = require('express');
const mongoose = require('mongoose');
const client = require('prom-client');
require('dotenv').config();

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Collect default metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Expose metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

// Your existing routes and middleware
// ...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
