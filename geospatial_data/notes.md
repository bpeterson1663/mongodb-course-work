GeoJSON Objects
    - db.places.insertOne({name: "California Academy of Sciences", location: {type: "Point", coordinates: [-122.4724356, 37.7672544]}}) // type and coordinates are static values, cooridinates must be an array where the first value is the longitute and second is the latituded
    - db.places.find({location: {$near: {$geometry: {type: "Point", coordinates: [-122.47114, 37.771104]}, $maxDistance: 500, $minDistance: 10}}}) // need to have a geo spacial index, min and max needt o be in meters
    -db.places.createIndex({location: "2dsphere"})
    - type: "Plygon", coordinates need to be an array of an array of coordinates, must start and end with the same coordinates
    -  db.areas.find({area: {$geoIntersects: {$geeometry: {type: "Point", coordinates: [[p1, p2, p3]]}}}}) // to find if a user or place is within a Polygon area, this query assumes the index is created on area and that area is a Polygon. p1, p2, p3 are coordinates
    - db.places.find({location: {$geoWithin: {$centerSphere: [[-122.46203, 37.77286], 1 / 6378.1]}}}) // converting to kilometers
