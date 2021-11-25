const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Shopper = require('./models/shoppers')
const sending = require('./func/sendingEmail')
var generator = require('generate-password');

// require('./preInsertUUID')

const app = express()
const port = process.env.PORT || 3000
var ctr=0

app.use(express.json())




  // allow access form any HOST
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})


// app.post('/users', (req, res)=>{
//     const user = new User(req.body)

//     user.save().then(()=>{
//         res.send(user)
//     }).catch((e)=>{
//         res.send(e)
//     })
// })
app.post('/user/add', (req, res)=>{
    console.log(req)
    const user = new User(req.body)

    user.save().then(()=>{
        res.send("save correctly")
    }).catch((e)=>{
        res.send(e)
    })
})


app.get('/getAll', (req, res)=>{
    User.find({}).then(toret => {
        res.send(toret)
    }).catch((error)=>{
        res.status(500).send(error);
    })
})



app.post('/uuid/require', (req, res)=>{
    console.log("recived email reg"+ctr++);

    var newPassword = generator.generate({
        length: 10,
        numbers: true
    });
  
    Shopper.findOneAndUpdate({uuid: req.body.uuid}, {password: newPassword}).then( shopper => {
        sending(shopper.email, newPassword)
        res.status(200).send("sending")
    }).catch((error)=>{
        console.log(error);
        res.status(500).send(error+"error finding json in body");
    })
})

app.post('/uuid/verify', (req, res)=>{
    Shopper.findOne({uuid: req.body.uuid}).then( shopper => {
        console.log(shopper.password)
        console.log(req.body.password)
        res.send(shopper.password == req.body.password)
    }).catch((error)=>{
        res.status(500).send(error);
    })
    
})

app.listen(port, ()=>{
    console.log('Server Listening!' +port)
})