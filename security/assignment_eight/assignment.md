1. Create three users, Database Admin, User Admin, Developer
db.createUser({'user': 'brad', pwd: 'pwd', roles: ["userAdminAnyDatabase"]})
// login as admin 
db.auth('brady', 'pwd')
db.createUser({user: 'globalAdmin', pwd: 'admin', roles: ['dbAdminAnyDatabase']})
db.createUser({user: 'dev', pwd: 'dev', roles: [{role: "readWrite, db: "customers", role: {readWrite, db: "sales"}}]})