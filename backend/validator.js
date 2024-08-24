const zod = require('zod');

const createUser = zod.object({
    name : zod.string().min(4,{message: 'Name must be atleast 4 characters'}),
    email : zod.string({required_error: "User email is required"}).email({ message: 'Must be a valid email' }),
    password : zod.string().min(6,{message:"Password must contain atleast 6 characters"})
})

const loginUser = zod.object({
    email : zod.string({required_error: "User email is required"}).email({ message: 'Must be a valid email' }),
    password : zod.string().min(6,{message:"Password must contain atleast 6 characters"})
})

const createTodo = zod.object({
    title: zod.string().min(4,{message: 'Title must be atleast 4 characters'}),
    description : zod.string().min(6,{message: 'Description must contain atleast 6 characters'}),
})

const updateTodo = zod.object({
    title: zod.string().min(4,{message: 'Title must be atleast 4 characters'}).optional(),
    description : zod.string().min(6,{message: 'Description must contain atleast 6 characters'}).optional(),
})

const markTodo = zod.object({
    isCompleted : zod.boolean({required_error:'isCompleted field is required'})
})

module.exports = {
    createUser,
    loginUser,
    createTodo,
    updateTodo,
    markTodo
}