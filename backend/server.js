const express = require('express');
const db = require('./db'); // Import the MongoDB connection
const cors = require('cors');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const weatherRouter = require('./routes/weather');
const session = require('express-session');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: ['http://localhost:8081', 'http://127.0.0.1:8081'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'insecure-secret',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/weather', weatherRouter);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
