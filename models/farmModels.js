const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    _userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    name:String,
    lastCollected:{
        type:Number,
        default:Date.now(),
    },
});

module.exports = mongoose.model('Farm', farmSchema);