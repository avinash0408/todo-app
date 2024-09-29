const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name : String,
    email : { type: String, unique: true},
    password : String,
    createdOn: { type : Date, default: Date.now }
});

userSchema.pre('save',async function(next){
    const curPass = await bcrypt.hash(this.password,12);
    this.password = curPass;
    next();
})

userSchema.methods.comparePasswords = async function(plainPassword){
    return await bcrypt.compare(plainPassword,this.password);
}

const User = mongoose.model('Users',userSchema);

module.exports = User;