require('./db/mongoose')

const User = require('./models/user')
const Shopper = require('./models/shoppers')

const shopper = new Shopper({
    uuid: "72fb158f-8d8c-4892-af0e-42f22e47f33b",
    password: "3",
    email: "dhruvpatel1999ca@gmail.com",
    key: "1234"
})

shopper.save(function (err) {
    if (err) console.log('error ', err);
})

