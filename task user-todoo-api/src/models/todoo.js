
const mongoose = require('mongoose')

const todooSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:Buffer
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    avatar:{
        type:Buffer  
    }

})

const Todoo = mongoose.model('news',todooSchema)
module.exports = Todoo