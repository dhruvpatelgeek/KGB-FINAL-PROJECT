const mongoose = require('mongoose')

const Shopper = mongoose.model('Shopper',{
    uuid:{
        type: String
    }, 
    password: {
        type: String,
    },
    email: {
        type: String,
    }
})


module.exports = Shopper