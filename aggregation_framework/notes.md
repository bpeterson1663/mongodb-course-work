Aggregation Framework
- building a pipeline to ouptut the results I need
- aggregate method takes an array of steps
db.persons.aggregate([
    {$match: {gender: "female"}},
    { $group: {_id: { state: "$location.state" }, totalPersons: { $sum: 1} } }, 
    { $sort: { totalPersons: -1 }}]) 
    //after returning all femails, group by state. state doesnt matter but the $ refers to the actual field. This query returns a summary based on location of all females