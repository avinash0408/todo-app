const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    isCompleted: {type: Boolean, default: false},
    createdOn: {type: Date, default : Date.now}
})

const todo = mongoose.model('todos',todoSchema);

module.exports = todo;
