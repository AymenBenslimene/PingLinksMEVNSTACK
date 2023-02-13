const { links } = require("../models");
const db = require("../models");
const WebPage = db.webPage;
const link = db.links;
const { testPingLink2 } = require('../models/pingLink.js');
const request = require('request');
const cheerio = require('cheerio');
const { sendMail } = require("./mail.controller");
var async = require("async");
const { callbackPromise } = require("nodemailer/lib/shared");

// Create Ping Links and store the url and web page into DB 
module.exports.pingLinksCreate = async function(req,res) {
  
  if (!req.body.url) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a web Page
  testPingLink2("https://"+req.body.url,"http://"+req.body.itsLink, function (containLink) {
    
    //Create an instance of web Page
    const webPage = new WebPage({
      url: "https://"+req.body.url,
      //date: req.body.date,
      itsLink: "http://"+req.body.itsLink,
      userid: req.body.userid,
      valid: containLink
    });
    

    // Store into db with the results 
    WebPage
    .create(webPage)
    .then(data => {           
       res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Web Page."
      });
    }); 
});
}



// Create and Save a new webPage
exports.create = (req, res) => {
  // Validate request
  if (!req.body.url) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a web Page
  const webPage = new WebPage({
    url: "https://"+req.body.url,
    //date: req.body.date,
    itsLink: "http://"+req.body.itsLink,
    userid: req.body.userid,
    //valid: false

  });
  
  // Retrieve User's ID 

  const id = req.body.userid;

  WebPage
    .create(webPage)
    .then(data => {
      /// ADDING WebPage To User ( not working but if u can fix it, u are very welcomed ! )  
      db.user.findByIdAndUpdate(
        id,      
        { $push: { webPage: data.id } },
        { new: true, useFindAndModify: false }
      ).then(res.send(data));
      //res.send(data);
    })
  
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Web Page."
      });
    });
};

// Retrieve all webPage from the database.
exports.findAll = (req, res) => {

  const url = req.query.url;
    var condition = url ? { url: { $regex: new RegExp(url), $options: "i" } } : {};
  
    WebPage.find({condition,
        createdAt:{$gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) ,$lte: new Date(new Date().setFullYear(new Date().getFullYear() - 0)) }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Web Pages."
        });
      });
};

// Retrieve all webPage from the database.
exports.findAllbyUserID = (req, res) => {

  const url = req.query.url;
  const uid = req.params.userid;
    var condition = url ? { url: { $regex: new RegExp(url), $options: "i" } } : {};
  
    WebPage.find({condition,userid:uid,
        createdAt:{$gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) ,$lte: new Date(new Date().setFullYear(new Date().getFullYear() - 0)) }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Web Pages."
        });
      });
};

// Retrieve all webPage from the database.
exports.findAllHistory = (req, res) => {

  const url = req.query.url;

    //WebPage.find({created_on: {$gte: start, $lt: end}})
    WebPage.find({
      createdAt:{$gte: new Date(new Date().setFullYear(new Date().getFullYear() - 3)) ,$lte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }})
      //createdAt: {$lt: new Date(new Date().setFullYear(new Date().getFullYear() -0)), }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving History."
        });
      });
};

// Retrieve all webPage from the database.
exports.findAllHistorybyUserID = (req, res) => {

  const url = req.query.url;
  const uid = req.params.userid;
    //WebPage.find({created_on: {$gte: start, $lt: end}})
    WebPage.find({userid:uid,
      createdAt:{$gte: new Date(new Date().setFullYear(new Date().getFullYear() - 3)) ,$lte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }})
      //createdAt: {$lt: new Date(new Date().setFullYear(new Date().getFullYear() -0)), }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving History."
        });
      });
};

// Find a single webPage with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  WebPage.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Web Page with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Web Page with id=" + id });
    });
};

// Update a webPage by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  WebPage.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Web Page with id=${id}. Maybe Link was not found!`
        });
      } else res.send({ message: "Web Page was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Web Page with id=" + id
      });
    });
};

// Delete a webPage with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  WebPage.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Web Page with id=${id}. Maybe Web Page was not found!`
        });
      } else {
        res.send({
          message: "Web Page was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Web Page with id=" + id
      });
    });
};



// Delete all webPage from the database.
exports.deleteAll = (req, res) => {
  WebPage.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Web Page were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Web Pages."
      });
    });
};


// Delete all webPage from the database by User ID.
exports.deleteAllbyUserID = (req, res) => {
  const uid = req.params.userid
  WebPage.deleteMany({userid:uid})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Web Page were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Web Pages."
      });
    });
};


/// Add Link to WebPage
exports.addLinkTowebPage = (req, res) => {
  db.webPage.findByIdAndUpdate(
    req.body.webPageId,
    {$push:{ links: req.body.linkId }},
    { new: true, useFindAndModify: false }
  )
  .then(data => {
    res.send({
      message: `Link were added to Web Page successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while Adding Link to Web Page."
    });
  });
};

// Find all Valid web page and link
  exports.findAllValid = (req, res) => {
    Links.find({ valid: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Web Page."
        });
      });
  };



// Check and change Ping Links 
module.exports.pingLinksCheck = async function(req,res) {

  

  db.webPage.find().then(data => { 

    // create variable of mailList
    const mailListIds = [];
    // callbacks counter
    let nb_callbacks = 0;
      // for each webpage in DB we check if there is still a ping between url and its link
      for (let element of data){
        
        console.log(element.url);
        // Check ping links
        testPingLink2(element.url,element.itsLink, async function (containLink) {

          nb_callbacks++;

          // Ping Links was True and changed to False
          if ((await containLink === false)) {      //if ((element.valid === true) && (containLink === false))
            //setting contents
            mailListIds.push(element);
            console.log("Ping Link between :",element.url," and ", element.itsLink, "was", element.valid, "now its",containLink);
          }; 
          
          console.log("Ping Link between :",element.url," and ", element.itsLink, "was", element.valid, "now its",containLink);
          // Update with the results
          if(await containLink !== element.valid){
          WebPage.findByIdAndUpdate(element.id, {valid : containLink})
          .then(updateddata => {
            console.log(`Link were updated to Web Page successfully!`);
          })
          .catch(err => {
            console.log("Some error occurred while retrieving Web Page.");
          });
          
        }

        if(nb_callbacks == data.length){
          sendMail(mailListIds);
        }
        });
        
          
    }
    
  });

  
  
  console.log("PING LINKS Check Ended ");
  //res.send("RUNNING PING LINKS CHECK ENDED");
};
    

