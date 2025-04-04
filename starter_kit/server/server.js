const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRouter = require('./recipes_router');

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.json());
app.use('/recipe', recipeRouter);

// ✅ Root route to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.send('🍽️ Welcome to the Recipe Server API - CPAN 212');
});

mongoose.connect('mongodb://127.0.0.1:27017/recipesDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
