//Aggregation will return the lcoatoin and full name using the first and last name converting case
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      birthdate: { $convert: { input: "$dob.date", to: "date" } },
      age: "$dob.age",
      location: {
        type: "Point",

        coordinates: [
          {
            $convert: {
              input: "$location.coordinates.longitude",
              to: "double",
              onError: 0.0,
              onNull: 0.0,
            },
          },
          {
            $convert: {
              input: "$location.coordinates.latitude",
              to: "double",
              onError: 0.0,
              onNull: 0.0,
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      _id: 0,
      gender: 1,
      location: 1,
      birthdate: 1,
      age: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
          {
            $substrCP: [
              "$name.first",
              1,
              { $subtract: [{ $strLenCP: "$name.first" }, 1] },
            ],
          },
          " ",
          { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
          {
            $substrCP: [
              "$name.last",
              1,
              { $subtract: [{ $strLenCP: "$name.last" }, 1] },
            ],
          },
        ],
      },
    },
  },
  { $group: { _id: { birthYear: { $isoWeakYear: "$birthdate" } }, numbPersons: { $sum: 1 }}},
  { $sort: { numPersons: -1 } }
]);
// Result 
// { "location" : { "type" : "Point", "coordinates" : [ -70.2264, 76.4507 ] }, "birthdate" : ISODate("1988-10-17T03:45:04Z"), "age" : 29, "fullName" : "Zachary Lo" }
// { "location" : { "type" : "Point", "coordinates" : [ 111.3806, -31.6359 ] }, "birthdate" : ISODate("1962-08-11T20:51:07Z"), "age" : 56, "fullName" : "Maeva Wilson" }
// { "location" : { "type" : "Point", "coordinates" : [ -54.1364, -86.1268 ] }, "birthdate" : ISODate("1971-03-28T04:47:21Z"), "age" : 47, "fullName" : "Gideon Van drongelen" }
// { "location" : { "type" : "Point", "coordinates" : [ -18.5996, -42.6128 ] }, "birthdate" : ISODate("1986-03-29T06:40:18Z"), "age" : 32, "fullName" : "Elijah Lewis" }
// { "location" : { "type" : "Point", "coordinates" : [ -31.0208, -29.8113 ] }, "birthdate" : ISODate("1959-02-19T23:56:23Z"), "age" : 59, "fullName" : "Victor Pedersen" }
// { "location" : { "type" : "Point", "coordinates" : [ -154.6037, -29.6721 ] }, "birthdate" : ISODate("1984-09-30T01:20:26Z"), "age" : 33, "fullName" : "Carl Jacobs" }

// Pusing Elements into newly created arrays

db.persons.aggregate([
    { $group: { _id: { age: "$age"}, allHobbies: { $push: "$hobbies"}}} //allHobbies will be an array of an arrays since $hobbies is an array
])

db.persons.aggregate([
    { $unwind: "$hobbies" }, // pulls out each value in the array
    { $group: { _id: { age: "$age"}, allHobbies: { $addToSet: "$hobbies"}}} // add to set only adds unique, allHobbies will now be an array of strings
])
// $size // calculates the length of the array

// {$filter: {input: "$examScores", as: "sc", cond: { $gt: ["$$sc.score", 60]}}} //$$ is a refernce to the alias - as: sc


db.persons.aggregate(
    { $unwind: "$examScores"},
    { $project: { _id: 1, name: 1, age: 1, score: "$examScores.score"}},
    { $sort: { "score": -1}},
    { $group: { _id: "$_id", name: { $first: "$name" }, maxScore: { $max: "$score" }}},
    { $sort: { maxScore: -1}},
    { $limit: 10 },
    { $out: "nameOfCollection" } //outputs results directly into collection
)

//Distribution of data
db.persons.aggregate([
    { $bucket: { groupBy: "$dob.age", boundaries: [0, 18, 30, 50, 60, 120], output: {numPersons: {$sum: 1}, averageAge: { $avg: "$dob.age"}}}}
]) // can use $bucketAuto command, need the groupBy, output and buckets field. replaces the boundaries command

// $geoNear needs to be the first step in an aggregate pipeline