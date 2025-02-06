const mongoose = require('mongoose')

const cakeSchema = mongoose.Schema({
    title:{
        type :String,
        required : true
    },
    ingredients:{
        type :Array,
        required : true
    },
    instruction:{
        type :String,
        required : true
    },
    time:{
        type :String,
    },
    coverImage:{
        type :String,
    },
    createdBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "User" 
    }
},{timestamps : true})

module.exports = mongoose.model('cakes',cakeSchema)