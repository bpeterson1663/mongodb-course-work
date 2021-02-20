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