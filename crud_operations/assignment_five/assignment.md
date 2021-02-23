1. Create a new collection and upsert two new documents into it
    - db.sports.updateMany({title: "Football"}, {$set: { requiresTeam: true}}, {upsert: true})
     - db.sports.updateMany({title: "Basketball"}, {$set: { requiresTeam: true}}, {upsert: true})
2. Update all documents which do require a team by adding a new field with the minimum amount of players required
    - db.sports.updateMany({requiresTeam: true}, {$set: {minPlayers: 11}})
3. Update all documents that requre a team by increasing the number of required players by 10
    - db.sports.updateMany({requiresTeam: true}, {$inc: {minPlayers: 10}})