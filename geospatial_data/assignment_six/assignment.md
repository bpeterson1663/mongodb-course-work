1. Pick 3 Points on Google Maps and store them in a collection
- db.places.insertMany([{name: "Point 1", location: {type: "Point", coordinates: [-93.34758675644791, 44.94382072273733]}}, {name: "Point 2", location: {type: "Point", coordinates: [-93.34750062777705, 44.94828600473004]}}, {name: "Point 3", location: {type: "Point", coordinates: [-93.33193209419572, 44.94815210971145]}}])

- db.places.createIndex({location: "2dsphere"})
2. Pick a point and find the nearest points within a min and max distance
db.places.find({location: {$near: {$geometry: {type: "Point", coordinates: [-93.34186200351859, 44.9464023978207]}, $maxDistance: 5000, $minDistance: 10}}})
3. Pick an area and see which points (that are stored in your collection) it contains
db.places.find({location: {$geoIntersects: {$geometry: {type: "Polygon", coordinates: [[[-93.3504437419492, 44.945285707320416], [-93.3454267466639, 44.94516378659316], [-93.34435013823357, 44.94196327489043], [-93.3530491343506, 44.9425424283255], [-93.3504437419492, 44.945285707320416]]] }}}})
4. Store at least one area in a different collection
db.areas.insertOne({name: "Awesome Area", loc: {type: "Polygon", coordinates: [[[-93.3504437419492, 44.945285707320416], [-93.3454267466639, 44.94516378659316], [-93.34435013823357, 44.94196327489043], [-93.3530491343506, 44.9425424283255], [-93.3504437419492, 44.945285707320416]]]}})
db.areas.createIndex({loc: "2dsphere"})
5. Pick a point and find out which areas in your collection contain that point 
db.areas.find({ loc: {$geoIntersects: {$geometry: {type: "Point", coordinates: [-93.3454267466639, 44.94516378659316]} }}})
