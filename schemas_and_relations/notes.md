Reseting Database/Collection
    - use DATABASE_NAME
    - db.dropDatabase()
    - db.COLLECTION_NAME.drop()

db.stats() 
    - outputs stats on the database
    - example: 
    {
        "db" : "shop",
        "collections" : 2,
        "views" : 0,
        "objects" : 6,
        "avgObjSize" : 69.33333333333333,
        "dataSize" : 416,
        "storageSize" : 73728,
        "indexes" : 2,
        "indexSize" : 73728,
        "totalSize" : 147456,
        "scaleFactor" : 1,
        "fsUsedSize" : 79789940736,
        "fsTotalSize" : 121018208256,
        "ok" : 1
    }

Relations
    One To One - Recommended to have embedded document
    - user a reference - db.cars.insertOne({owner: ObjectId(ID_OF_OWNER)}) - need to make an extra request to get the person. 
    One To Many - example (many citizens belong to a city)
    - use a reference
    Many to Many - example (products and customers)
    - instead of creating an orders collection, update the customers colleciton with an orders array of next objects using a refernce to the products. We may not care if the original document changed, but more concerned with taking a "snapshot" of it at the time
    - Avoid deep nesting as much as possible
    - Summary - Nested/Embedded Documents vs References

Merging Reference Relations with $lookup
 - db.books.aggregate([
     {
         $lookup: {
            from: "authors", // collection
            localField: "authors", // array of ids on books
            foreignField: "_id",
            as: "creators"
        }
    }
    ])

Example - Blog
    Types of Data
        - User - name, age, email
        - Post - title, text, tags
        - Comment - text

    User can create a Post, User can create a Comment, Comment belongs to Post
    Comment always belongs to one Post, a Post can have many Comments,

    If User changes, have an embeded document would not be the best appraoch. 

    db.users.insertMany([{name: "Brady", age: 32, email: "test@test.com"}, {name: "Jax", age: 1, email: "test1@test.com"}])

    db.posts.insertOne({title: "My First Post", content: "content for the post", tags: ["new", "tech"], creator: ObjectId(ID_OF_AUTHOR), comments: [{text: "I like this post", author: ObjectID(ID_OF_AUTHOR)}]})

    Comment collection would be unnecessary

Schema Validation
    - use createCollection to enforce schema validation
    - db.createCollection("posts", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title", "text", "creator", "comments"], // name of the fields
                properties: {
                    title: {
                        bsonType: "string",
                        description: "must be a string"
                    },
                    text: {
                        bsonType: "string",
                        description: "must be a ststringinrg"
                    },
                    creator: {
                        bsonType: "objectId",
                        description: "must be an objectId"
                    },
                    comments: {
                        bsonType: "array",
                        description: "must be an objectId",
                        required: ["text", "author"]
                        items: {
                            bsonType: "object",
                            properties: {
                                text: {
                                    bsonType: "string", 
                                },
                                author: {
                                    bsonType: "objectId"
                                }
                            }
                        }
                    }
                }
            }
        }})

 - db.runCommand({collMod: "posts", validator: {...}}) // how to change an existing collection's validation