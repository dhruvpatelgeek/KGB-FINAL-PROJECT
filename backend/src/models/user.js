const { Int32 } = require('bson');
const mongoose = require('mongoose')

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const User = mongoose.model('User',{
    tag:{
        type: String
    },
    nonce:{
        type: String
    },
    fingerprint:{
        type: String
    },
    timestamps: { 
        type: String
    },
    createdBy: {
        type: String,
        default: "UBC"
    }
})


module.exports = User