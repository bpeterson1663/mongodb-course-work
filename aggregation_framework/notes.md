Aggregation Framework
- building a pipeline to ouptut the results I need
- aggregate method takes an array of steps
db.persons.aggregate([
    {$match: {gender: "female"}},
    { $group: {_id: { state: "$location.state" }, totalPersons: { $sum: 1} } }, 
    { $sort: { totalPersons: -1 }}]) 
    //after returning all femails, group by state. state doesnt matter but the $ refers to the actual field. This query returns a summary based on location of all females

Projections in Aggregation
db.persons.aggregate([{ $project: { _id: 0, gender: 1, fullName: {$concat: ["$name.first", " ", "$name.last"] }}}])

db.persons.aggregate([{ $project: {_id: 0, name: 1, email: 1, location: {type: "Point", coordinates: ["$location.coordinates.longitude", "$location.coordinates.latitude"]}}},{ $project: { _id: 0, gender: 1, fullName: {$concat: [{$toUpper: { $substrCP: ["$name.first", 0, 1]}}, {$substrCP: ["$name.first", 1, { $subtract: [ {$strLenCP: "$name.first"}, 1 ]}]}, " ", {$toUpper: { $substrCP: ["$name.last", 0, 1]}}, {$substrCP: ["$name.last", 1, { $subtract: [ {$strLenCP: "$name.last"}, 1 ]}]}] }}}]) 
https://docs.mongodb.com/manual/reference/operator/aggregation/substrCP/index.html 