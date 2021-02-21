1. Import the attached data into a new database and collection
    -- mongoimport boxoffice.json -d boxOffice -c movies --jsonArray --drop
2. Search all movies that have a rating higher than 9.2 and a runtime lower than 100 minutes
    db.movies.find({"meta.rating": {$gt: 9.2}, "meta.runtime": {$lt: 100}})
3. Search all movies that have a genre of "drama" or "action"
    db.movies.find({$or: [{genre: "drama"}, {genre: "action"}]}) // returns all three as expected
    db.movies.find({$and: [{genre: "drama"}, {genre: "action"}]}) // returns only as expected
4. Search all movies where visitors exceeded expectedVisitors
    db.movies.find({$expr: {$gt: ["$visitors", "$expectedVisitors"]}}) 