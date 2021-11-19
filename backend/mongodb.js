// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'test'

MongoClient.connect(connectionURL, {useNewURLParser: true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database!')
    }

    const db = client.db(database)

    //Read
    db.collection('users'). find({name:'Patrick Huang'}).toArray((error, users)=>{
        console.log(users)
    })

    // Insert
    // db.collection('users').insertOne({
    //     name: 'Alice',
    //     age: 23
    // }, (error, result)=>{
    //     if(error) return console.log('Unable to insert user')

    //     console.log(result.ops)
    // })
})