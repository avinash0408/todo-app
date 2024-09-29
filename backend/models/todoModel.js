const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    isCompleted: {type: Boolean, default: false},
    createdOn: {type: Date, default : Date.now},
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
})

const todo = mongoose.model('todos',todoSchema);

module.exports = todo;
