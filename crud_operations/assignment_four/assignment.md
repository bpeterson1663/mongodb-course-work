1. Import the attached data file into a new collection in the boxOffice database
mongoimport boxoffice-extended.json -d boxOffice -c moviesExtended --jsonArray
2. Find all movies with exactly two genres
db.moviesExtended.find({"genre": {$size: 2}})
3. Find all movies which aired in 2018
db.moviesExtended.find({"meta.aired": 2018})
4. Find all movies which have ratings greater than 8 but lower than 10
db.moviesExtended.find({ratings: {$elemMatch: {$gt: 8, $lt: 10}}})
