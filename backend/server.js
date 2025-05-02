const express = require('express');
const db = require('./db'); // Import the MongoDB connection
const cors = require('cors');
const postsRouter = require('./routes/posts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
