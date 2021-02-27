Role Based Access Control
- User is your driver or a data analyst, not a user of the the application
Examples of Roles
    - Administrator needs to be able to manage the database config, create users, Does not need to be able to insert or fetch data
    - Developer needs to be able to insert, delete or fetch data, does not need to be able to create users or manage the database config
    - Data Scientist needs to be able to fetch data, does not need to be able to create users, manage the database config or insert edit or delete data

Creating and Editing Users
- createUser() - users are attached to a databse
- updateUser()
- dropUser()
start mongod with the --auth flag to ensure all users must be authenticated

db.auth() or mongo -u brady -p password --authenticationDatabase admin
use admin
db.createUser({user: "brady", pwd: "pwd", roles: ["userAdminAnyDatabase"]})

Built in Roles - "read", "readWrite", "dbAdmin", "userAdmin", "dbOwner", "readAnyDatabase", "readWriteAnyDatabase", "userAdminAnyDatabase", "dbAdminAnyDatabase"

Cluster Admin - clusterManager, clusterMonitor, hostManager, clusterAdmin

Backup restore - backup, restore

Superuser - root
https://docs.mongodb.com/manual/reference/built-in-roles/index.html 

db.updateUser("appdev", {roles: ["readWrite", {role: "readWrite", db: "dbName"}]}) // if a am in a different database, I can still give access to another database by using this example. updating roles will override any other roles that are assigned

Transport Encryption
https://docs.mongodb.com/manual/tutorial/configure-ssl/#procedures-using-net-tls-settings
 - For testing https://docs.mongodb.com/manual/appendix/security/appendixA-openssl-ca/ 