Transactions
- Need Mongo 4.0
Works with a session, where all requests are grouped to gether

db.getMongo().startSession()
session.startTransaction()
const usersC = session.getDatabase("blog").users // store a refernce to the session
const postsC = session.getDatabase("blog").posts
usersC.deleteOne({_id: "ID"}) // stored in memory

session.commitTransaction() // commits the transaction, if something goes wrong, anything stored in the session will be rolled back. 

Official Docs on Transactions: https://docs.mongodb.com/manual/core/transactions/