What Influences Performance
- Efficient Queries/ Operations
- Indexes / should add these where it makes sense
- Fitting Data Schema

Capped Collections
- Older data gets delete to make room for the new 
- db.createCollection("capped", {capped: true, size: 10000, max: 3}) // default size limit 4 B, max is the limit for documents

Sharding (Horizontal Scaling)
- data is distributed across shards
- Mongos (router) handles the routing between the shards
- shard key is needed for each document to tell the system what shard the document is stored on

Replica Sets
- Primary Node will asynchrously replicated its self on the secondary node
- If Primary node goes down, Secondary node will be read from until Primary node comes back up online

