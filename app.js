//externel imports

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');

//internel imports

const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');

const app = express();
dotenv.config();


//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

//request parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//set view engine
app.set('view engine', 'ejs');

//set public folder

app.use(express.static(path.join(__dirname, 'public')));


//parse cookies

app.use(cookieParser(process.env.COOKIE_SECRET));


//routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);


//404 not found handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);



//port


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});