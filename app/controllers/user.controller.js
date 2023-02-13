const db = require("../models");
//const user = db.user;
const WebPage = db.webPage;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  user.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    links.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Link with id=" + id
        });
      });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
};

//Add Web Page to User

// Retrieve web page of users


/** 
// Create and Save a new User
exports.create = (req, res) => {
   // Validate request
   if (!req.body.url) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a user
  const user = new user({
    url: req.body.url,
    valid: req.body.valid ? req.body.valid : true
  });
  // Save link in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating User."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    user.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      links.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update User with id=${id}. Maybe User was not found!`
            });
          } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Link with id=" + id
          });
        });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  
};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all Valid User
exports.findAllValid = (req, res) => {
  
};
*/
//// AUTHENTICATION AND SUBSCRIPTION FUNCTIONS

