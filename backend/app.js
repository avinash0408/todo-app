const express = require('express');
const authRouter = require('./routes/authRouter');
const todoRouter = require('./routes/todoRouter');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter);
app.use('/todo',todoRouter);

module.exports = app;