require('./db/mongoose')

const User = require('./models/user')
const Shopper = require('./models/shoppers')

const shopper = new Shopper({
    uuid: "1",
    password: "2",
    email: "patrick.fengpenghuang@gmail.com",
    key: "123"
})

shopper.save(function (err) {
    if (err) console.log('error ', err);
})
