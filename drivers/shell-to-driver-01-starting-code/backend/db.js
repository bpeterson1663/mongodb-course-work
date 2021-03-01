const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const uri = "mongodb+srv://daily-user:"+process.env.MONGO_PASSWORD+"@cluster0.ybtum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let _db;

const initDb = callback => {
    if (_db) {
        console.log("Database is already initialized!")
        return callback(null, _db)
    } 

    client.connect(err => {
        _db = client
        if(err){
            callback(err)
        }else{
            callback(null, _db)

        }
      })
}

const getDb = () => {
    if (!_db){
        throw Error('Database not initialized')
    }
    return _db;
}

module.exports = {
    initDb,
    getDb
}