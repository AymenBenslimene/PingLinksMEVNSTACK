const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const webPageController = require("./app/controllers/webPage.controller.js");
const app = express();


//Schedule a Job 
const schedule = require('node-schedule')

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// mongodb atlas
const url = `mongodb+srv://pinglinks_db:pinglinks_db@cluster0.hc0znjd.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    
    useUnifiedTopology: true 
}
db.mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

/** // LOCAL MONGO DB Connexion ( please check ../app/config/db.config.js)
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
 */
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PING LINKS TEST." });
});


// Include Routes
require("./app/routes/links.routes")(app);
require("./app/routes/webPage.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
//require("./app/routes/user.routes")(app);


// For production environment
if( process.env.NODE_ENV === "production"){
  app.use(express.static(__dirname +"/dist/"));
  app.get("*",(req,res) =>
  {
    res.sendFile(__dirname + "/dist/index.html")
  }
  );
}

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
});

/// Set ROLES for Users
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

/// Schedule 
/// Schedule Links Check every day 

  // every  30 second = '*/30 * * * * *'
  // every day = '0 0 * * *'
schedule.scheduleJob('0 0 * * *',()=> {

  //
  console.log("PING LINKS Check Start: ");
  webPageController.pingLinksCheck();
  

})