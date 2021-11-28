const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Shopper = require('./models/shoppers')
const sending = require('./func/sendingEmail')
var generator = require('generate-password');
const webpush = require('web-push')


const publicVapidKey = "BCiMs0S9ZX0R_hHLDpc7q_WtPVTXor1QTy1J3Xl_Vg9pylJjlW8OpzeR-J7TTfLyKbc-3czy2buTDtInggcPPTI"
const privateVapidKey = "ZkNbps78RWhjovhIi-FmR8ovsTBA2PcwcUVKKHkOM3Q"
webpush.setVapidDetails('mailto:cpen442fastscan@gmail.com', publicVapidKey, privateVapidKey)
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

app.get('/verified', (req, res)=>{
    let id = req.body().id

})



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


app.post('/subscribe', (req, res)=>{
    const subscription = req.body;

    res.status(201).json({})

    const payload = JSON.stringify({title: 'Section.io Push Notification' });

    webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})

app.listen(port, ()=>{
    console.log('Server Listening!')
})