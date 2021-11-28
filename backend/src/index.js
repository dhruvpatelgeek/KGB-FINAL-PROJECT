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
var ctr=0

// to compare password hashes
var crypto = require('crypto');

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


app.post('/getAll', (req, res)=>{
    User.find({}).then(toret => {
        res.send(toret)
    }).catch((error)=>{
        res.status(500).send(error);
    })
})

app.get('/verified', (req, res)=>{
    let id = req.body().id

})



app.post('/uuid/require', (req, res)=>{
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
    console.log("verifying password for "+req.body.uuid);
    Shopper.findOne({uuid: req.body.uuid}).then( shopper => {

        var passwordHash = crypto.createHash('sha256').update(shopper.password).digest('hex');
        console.log("password is "+shopper.password)
        console.log("password recided  is "+req.body.password)
        console.log("password in store is "+passwordHash)
        
        jsonResponseObject=JSON.stringify({ isPasswordCorrect: passwordHash==req.body.password,err: "nil"})

        // if(true){ // debug mode
        //     jsonResponseObject=JSON.stringify({ isPasswordCorrect: true,err: "nil"})
        // }
        res.send(jsonResponseObject)
    }).catch((error)=>{
        jsonResponseObject=JSON.stringify({ isPasswordCorrect: false,err: error})
        res.status(500).send(jsonResponseObject);
    })
    
})


app.post('/subscribe', (req, res)=>{
    const subscription = req.body;

    res.status(201).json({})

    const payload = JSON.stringify({title: 'Section.io Push Notification' });

    webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})

app.listen(port, ()=>{
    console.log('Backend server listening on ['+port+']')
})