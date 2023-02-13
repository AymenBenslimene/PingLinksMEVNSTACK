const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;


// User 
db.user = require("./user.model.js")(mongoose);
// Web Page 
db.webPage = require("./webPage.model.js")(mongoose);
// Links 
db.links = require("./links.model.js")(mongoose);

// Role
db.role = require("./role.model"); 
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

