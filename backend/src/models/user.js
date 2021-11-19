const mongoose = require('mongoose')

const User = mongoose.model('User',{
    figerprint_hash:{
        type: String
    },
    name:{
        type: String
    }, 
    age: {
        type: Number,
        default: 0
    },
    
})


module.exports = User