const express = require('express');
const app = express();
const mongoose = require('mongoose');
// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// cookie parser
const cookieParser = require('cookie-parser');

// to hide database credentials
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => 
console.log('Connected to database'));

// Middlewares
// Post request Middleware (we use express's body parser so we can send post requests)
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
// to use cookie parser
app.use(cookieParser());

// Routes
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// Cookies Routes




app.listen(process.env.API_PORT, () => console.log(`Server works: http://localhost:${process.env.API_PORT}/api/user`));