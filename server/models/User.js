const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:{
        type: String,
        requried: true,
        unique: true
    },
    password:{
        type: String,
        requried: true,
    }
    
})


module.exports = mongoose.model('User', UserSchema);