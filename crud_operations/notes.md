Create
    - insertOne
    - insertMany
    - insert - not recommended compared to the other two
    - mongo import 
    - can overwrite the _id value instead of using the auto generated
    - will fail if duplicate id
    - when using insertMany you can pass in { ordered: false }, to try the other inserts after a failure
    - writeConcern
       {
           writeConcern: { 
               w: 1 // can set to 0 which will decrease the speed of the transaction but wont know if succedded
               j: true // default is false, setting true will increase the time it takes cause it adds it to the journal 
               wtimeout: 200 // time out if transaction takes too long 
            }
       }

    -Automicity
        - roll backs the transacition, on a document level, - embedded documents are rolled back

Importing Data
mongoimport tv-shows.json -d tv -c tvShows --jsonArray --drop
 -d // the database
 -c // the collection
 --jsonArray // delcaring the file as a json array
 --drop // drops collection if exists

 
Read
    - Operators
        Query Selectors
            - Comparison
            - Evaluation
            - Logical
        Projection Operators

    - find // returns more than one document if exist
    - findOne

    db.tvShows.find({runtime: 60}) // will return all shows where runtime is 60 - same as {$eq: 60}
    db.tvShows.find({runtime: {$ne: 60}}) // not equal to 60
    db.tvShows.find({runtime: {$lt: 60}}) // less than 60 can use $lte which is <=
    db.tvShows.find({runtime: {$gt: 60}})
    db.tvShows.find({"raiting.average": {$gt: 7}}) //returns all tv shows with raitings greater than 7
    db.tvShows.find({genres: "Drama"}) // genres is an array, if I used $eq then only arrays with just "Drama" will be returned

    $in and $nin (in and not in)
    $or and $nor 
    db.tvShows.find({$or:[{"rating.average": {$lt: 5}, {"rating.average": {$gt: 9.5}}}]) // return all tv shows that are less than 5 or greater than 9.5

    db.tvShows.find({$nor:[{"rating.average": {$lt: 5}, {"rating.average": {$gt: 9.5}}}]) // return all tv shows that are greater than 5 or less than 9.5

    $and is the default concantination when passing in multiple query operators
    - need to use $and if you are looking for multiple values of the same field. Otherwise the last value will overwrite the first

    db.tvShows({runtime: {$not: {$eq}}}) // same as $ne

    db.users.find({age: {$exists: true, $ne: null}}) //finds users where age exists and is not equal to null

    db.sales.find({$expr: {$gt: ["volume", "target"]}}) // return all sales where volume is greater than target

    db.sales.find({$expre: [{$cond: {if: {$gte: ["$volume", 190]}, then: {$subtract: ["$volume", 10]}, else: "$volume" }}, "$target"]}) 
    
    Querying Arrays
        - db.users.find({"hobbies.title": "Sports"}) // hobbies is an array and will search all documents and all documents in hobbies 
        - db.users.find({hobbies: {$size: 3}}) // only exact matches. Will return all users that have 3 hobbies
        - db.boxOffice.find({genre: {$all: ["action", "thriller"]}}) // if I didnt specify $all then only documents that have this order will be returned. $all ignores order and will any document that contains the values regardless of order
        db.users.find({hobbies: {$elemMatch: {title: "Sports", frequency: {$gte: 3}}}}) // searches all documents but focuses on the embeded documents in hobbies to return results

    Sort
        - db.movies.find().sort({"rating.average": 1, runtime: -1}) // 1 = ascending, -1 = descending

    Projection
        - db.movies.find({}, {name: 1, runtime: 1, genres: 1}) //second argument to find is the projection, how we want the data returned. This query will return all movies but only the name, runtime and genres fields
        db.movies.find({genres: "Drama"}, {genres: {$elemMatch: {$eq: "Horror"}}}) // will return all movies that have Drama but will only output genres: ["Horror"], this will result in some documents outputing blank if they dont have Horror as a genre along with drama

Update
    db.users.updateOne({id: ObjectId(ID)}, {$set: {hobbies: [...newInformation]}}) // will overwrite the existing hobbies array
    db.users.updateMany() // can be used to update many documents where certain criteria are met
    db.users.updateOne({name: "Manuel}, {$inc: {age: 1}}) // increment age by one, set to -1 to decrement
    db.users.updateOne({name: "Chris}, {$min: {age: 35}}) // min will change the value if the current value is lower than 35, in this scenario. Vice versa for $max
    db.users.updateOne({name: "Chris}, {$mul: 1.1}) //increase by 10$
    db.users.updateMany({isSporty: true}, {$set: {phone: null}}) // all users where isSporty set to true, set phone to null
    db.users.updateMany({isSporty: true}, {$unset: {phone: ""}}) // removes the phone attribute where isSporty is true
    db.users.updateMany({}, {$rename: {age: "totalAge"}}) // update all users to change age to totalAge. If age doesnt exists nothing happens
    db.users.updateOne({name: "Maria"}, {$set: {age: 29, hobbies: [{title: "Good food", frequency: 3}]}}, {upsert: true}) //Maria document doesn't exist. Passing upsert will add Maria if it doesnt exist. The name will get added as part of the document