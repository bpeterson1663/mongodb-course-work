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