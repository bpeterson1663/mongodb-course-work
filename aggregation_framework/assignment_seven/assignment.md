Only persons older 50, group by gender, average age

db.persons.aggregate([ {$match: {"dob.age": {$gt: 50}}} , { $group: {_id: { gender: "$gender" }, numPersons: { $sum: 1}, avgAge: { $avg: "$dob.age" } } }, { $sort: { numPersons: -1 }}]) 

// results
{ "_id" : { "gender" : "female" }, "numPersons" : 1125, "avgAge" : 61.90577777777778 }
{ "_id" : { "gender" : "male" }, "numPersons" : 1079, "avgAge" : 62.066728452270624 }