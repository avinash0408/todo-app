const express = require('express');
const authRouter = require('./routes/authRouter');
const todoRouter = require('./routes/todoRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter);
app.use('/todo',todoRouter);

module.exports = app;