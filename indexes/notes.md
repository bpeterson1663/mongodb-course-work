Indexes
    - .explain method gives details about the query.
    - explain("executionStats") to give stats on the query time 
    - creating an index
        db.persons.createIndex({"db.age": 1}) // 1 or -1 for ascending or descending
    - If you have a query that returns a majority of or documents, an index can slow down your query. If you have a query only returns a subset (20% or so of total documents), then an index will probably be helpful

Compound Index
    - db.persons.createIndex({"dob.age": 1, gender: 1}) // creates one index relating these two. Order matters

getIndexes() // returns all indexes

createIndex({indexName: 1}, {unique: true}) //makes sure index is unique

Partial Filter
db.persons.createIndex({"dob.age": 1}, {partialFilterExpression: {gender: "male"}}) // will only create the index on the age field where gender is male. Querying just by age will still return females in this scenario. Using a partial index saves on space and performance since we are not creating the index for all documents.

Time to Live Index
    - db.sessions.insertOne({data: "somestring", createdAt: new Date()})
    - db.sessions.createIndex({createdAt: 1}, {expireAfterSeconds: 10}) will remove any document after 10 seconds. Only works on date fields

Covered Query
    - use a projection in a query, or a very flat document with only a few fields. The index is then covered by the query and no need to examine the docs and speed will be extremly fast

Multi-Key Indexes
    - indexes addded on to an array. Mongo treats these as a separate index on each value in the array

Text Index
    - db.products.createIndex({description: "text"}) // will create an index on key words
    - db.products.find($text: {$search: "foo"}) // will search the text index (description) for foo, can search for phrases using escape "\"red book\"" 
    - can only have one text index
    - can merge fields
        - db.products.createIndex({title: "text", description: "text"}) // search will search both title and description
    - can rule out words as well
        - db.products.find({$text: {$search: "awesome -t-shirt"}}) // the - in front of t-shirt will exclude results with t-shirt even though it has awesome

execute credit-rating.js
- mongo credit-rating.js