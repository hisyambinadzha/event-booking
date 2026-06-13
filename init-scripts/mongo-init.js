db = db.getSiblingDB("admin");
if (!db.getUser("user")) {
  db.createUser({
    user: "user",
    pwd: "password",
    roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        { role: "readWriteAnyDatabase", db: "admin" },
        { role: "dbAdminAnyDatabase", db: 'admin' }
      ],
  });
  print("✅ User 'user' created.");
} else {
  print("ℹ️ User 'user' already exists, skipping creation.");
}

db = db.getSiblingDB("trainingdb");
db.createCollection("users");

print("Before findOne query"); 
var user = db.users.findOne({email: "admin@gmail.com"});
if (!user) {
  db.users.insertOne({
    name: "Admin User",
    email: "admin@gmail.com",
    password: "$2a$10$GHJPOxiEHQ2fMWDpQgjL4uG1doO1CWt26tY8meS/mD4AgYXp8WeWe",
    role: "ADMIN"
  });
  print("✅ Admin user inserted");
} else {
  print("ℹ️ User already exists");
}
