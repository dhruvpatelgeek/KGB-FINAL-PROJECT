const mongoose = require('mongoose')

const User = mongoose.model('User',{
    fingerprint:{
        type: String
    },
})


module.exports = User