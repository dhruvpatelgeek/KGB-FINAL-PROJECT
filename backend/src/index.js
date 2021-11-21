const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Shopper = require('./models/shoppers')
const sending = require('./func/sendingEmail')
var generator = require('generate-password');

// require('./preInsertUUID')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())



// app.post('/users', (req, res)=>{
//     const user = new User(req.body)

//     user.save().then(()=>{
//         res.send(user)
//     }).catch((e)=>{
//         res.send(e)
//     })
// })



app.get('/uuid/require', (req, res)=>{
    var newPassword = generator.generate({
        length: 10,
        numbers: true
    });
    Shopper.findOneAndUpdate({uuid: req.body.uuid}, {password: newPassword}).then( shopper => {
        sending(shopper.email, newPassword)
        res.send("sending")
    }).catch((error)=>{
        res.status(500).send(error);
    })
})

app.get('/uuid/verify', (req, res)=>{
    Shopper.findOne({uuid: req.body.uuid}).then( shopper => {
        console.log(shopper.password)
        console.log(req.body.password)
        res.send(shopper.password == req.body.password)
    }).catch((error)=>{
        res.status(500).send(error);
    })
    
})

app.listen(port, ()=>{
    console.log('Server Listening!')
})