const express = require('express');
const authRouter = require('./routes/authRouter');
const todoRouter = require('./routes/todoRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


// Configure CORS
let corsOptions = {
    origin: 'https://vi-todo-app.vercel.app',// Allow requests from your frontend domain
 //  origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
   allowedHeaders: ['Content-Type', 'Authorization','Cookie'],
   secure: true,
    credentials: true
  };
app.use(cors(corsOptions));
  
app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter);
app.use('/todo',todoRouter);

module.exports = app;