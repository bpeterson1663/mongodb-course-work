## Basics
mongod to start database connection (need to add --dbpath to point to data/db)
mongo to start the shell to the connection 

mongo commands
show dbs - shows databases
use DATABASE_NAME = switches to database 
    db.COLLECTION = allows you to run all the commands available on the collection
    .find - finds document in the collection if left with no params it will return all
        $gt - greater than query - db.shop.find({price: {$gt: 10}}) //returns all documents with a price greater than 10
        returns a cursor object of first 20 instead of all objects. Contains the metadata for all documents
        .toArray - returns all the documents
        .forEach - will fetch each document 
    .insertOne - inserts a document
    .insertMany - takes an array of objects and creates a document for each
    .update - will replace object if $set is not used
    .replaceOne - replaces the data 
    .updateOne - first param is what we want to update, second is what we to change
        example - db.products.updateMany({}, {$set: {location: "shelf"}}) -- this will modify all documents in the collection and set the attribute "location" to "shelf"
    .deleteOne - deletes a collection

Projection 
    db.passengers.find({}, {name: 1, _id: 0}) // will return only the name value. Similar to how graphql only returns the data you need

Embedded Documents
    Up to 100 Levels of Nests and Max of 16mb per document
    when finding documents based on embedded documents you can do .find({"key.key"})

Learn more about the MongoDB Drivers: https://docs.mongodb.com/ecosystem/drivers/

Dive into the official Getting Started Docs: https://docs.mongodb.com/manual/tutorial/getting-started/