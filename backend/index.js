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

// Post request Middleware (we use express's body parser so we can send post requests)
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Routes
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// Cookies Routes
app.get('/api/set-cookies', async (req, res) => {

    // to register the cookie in the browser
    res.setHeader('Set-Cookie', 'newUser=true');

    res.send('you set the cookie');
});

app.get('/api/read-cookies', async (req, res) => {

});



app.listen(3000, () => console.log('Server works LUCAAAAAAAAAS http://localhost:3000/api/user'));