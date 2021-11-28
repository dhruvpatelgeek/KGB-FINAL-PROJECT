const mongoose = require('mongoose')

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const User = mongoose.model('User',{
    fingerprint:{
        type: String
    },
    timestamps: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        default: "UBC"
    }
})


module.exports = User