const express = require('express');
const authRouter = require('./routes/authRouter');
const todoRouter = require('./routes/todoRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// Configure CORS
app.use(cors({
    origin: 'https://vi-todo-app.vercel.app', // Allow requests from your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter);
app.use('/todo',todoRouter);

module.exports = app;