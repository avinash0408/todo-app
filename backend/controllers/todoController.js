const todoModel = require('../models/todoModel');
const { createTodo,updateTodo,markTodo } = require('../validator');

exports.getAllTasks = async(req,res) => {
    try{
        const todos = await todoModel.find({}).select('-__v');
        res.status(200).json({
            message : todos
        })
    }catch(err){
        return res.status(400).json({
            message : 'Error occured while fetching todos'
        })
    }
}
exports.createTask = async(req,res) => {
    const payload = req.body;
    const parsedPayload = createTodo.safeParse(payload);
    let newTodo ={};
    if(!parsedPayload.success){
        res.status(411).json({
            message : parsedPayload.error.issues.map(e=>e.message)
        })
        return;
    }
    const isExistingTodo = await todoModel.findOne({title:payload.title,description:payload.description});
    if(isExistingTodo){
        return res.status(400).json({
            message : `Todo - ${payload.title} already exists!!`
        })
    }
    try{
        newTodo = await todoModel.create({
            title : payload.title,
            description : payload.description
        })
    }catch(err){
        return res.status(400).json({
            message : 'Error occured while creating todo'
        })
    }
    res.status(201).json({
        message : 'New todo created successfully',
        todo: newTodo
    })
}

exports.updateTask = async(req,res) => {
    const payload = req.body;
    const parsedPayload = updateTodo.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({
            message : parsedPayload.error.issues.map(e=>e.message)
        })
        return;
    }
    const todoId = req.params.todoId;
    const isExistingTodo = await todoModel.findOne({_id:todoId});
    if(!isExistingTodo){
        return res.status(400).json({
            message : `Todo - ${payload.title} doesn't exist!!`
        })
    }
    try{
        const updatedTodo = await todoModel.updateOne({_id:todoId},{
            title : payload.title,
            description : payload.description
        })
    }catch(err){
        return res.status(400).json({
            message : 'Error occured while updating todo'
        })
    }
    res.status(201).json({
        message : ' Todo updated successfully'
    })
}

exports.markTask = async(req,res) => {
    const payload = req.body;
    const parsedPayload = markTodo.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({
            message : parsedPayload.error.issues.map(e=>e.message)
        })
        return;
    }
    const todoId = req.params.todoId;
    const isExistingTodo = await todoModel.findOne({_id:todoId});
    if(!isExistingTodo){
        return res.status(400).json({
            message : `Todo - ${payload.title} doesn't exist!!`
        })
    }
    try{
        const updatedTodo = await todoModel.updateOne({_id:todoId},{
            isCompleted : payload.isCompleted
        })
    }catch(err){
        return res.status(400).json({
            message : 'Error occured while marking todo'
        })
    }
    res.status(201).json({
        message : ' Todo Marked successfully'
    })
}

exports.deleteTask = async(req,res) => {
    const todoId = req.params.todoId;
    const isExistingTodo = await todoModel.findOne({_id:todoId});
    if(!isExistingTodo){
        return res.status(400).json({
            message : `Todo doesn't exist!!`
        })
    }
    try{
        const updatedTodo = await todoModel.deleteOne({_id:todoId})
    }catch(err){
        return res.status(400).json({
            message : 'Error occured while deleting todo'
        })
    }
    res.status(201).json({
        message : ' Todo Deleted successfully'
    })
}