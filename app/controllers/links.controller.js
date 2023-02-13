const db = require("../models");
const Links = db.links;

// Create and Save a new link
exports.create = (req, res) => {

   // Validate request
  if (!req.body.link) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a link
  const link = new Links({
    link: req.body.link,
    valid: req.body.valid ? req.body.valid : true
  });

  const id = req.params.id;
  // Save link in the database
  Links
    .create(link)
    .then(data => {
      

      /// ADDING Link To WebPage
      db.webPage.findByIdAndUpdate(
        id,
        
        { $push: { link: data.id } },
        { new: true, useFindAndModify: false }
      ).then(res.send(data));
      //res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating link."
      });
    });
};

// Retrieve all links from the database.
exports.findAll = (req, res) => {
    const link = req.query.link;
    var condition = link ? { link: { $regex: new RegExp(link), $options: "i" } } : {};
  
    Links.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving links."
        });
      });

};

// Find a single link with an id
exports.findOne = (req, res) => { 
    const id = req.params.id;

    Links.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Link with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Link with id=" + id });
    });
};

// Update a link by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Links.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Link with id=${id}. Maybe Link was not found!`
            });
          } else res.send({ message: "Link was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Link with id=" + id
          });
        });
};

// Delete a link with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  Links.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Link with id=${id}. Maybe Link was not found!`
        });
      } else {
        res.send({
          message: "Link was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Link with id=" + id
      });
    });
};

// Delete all link from the database.
exports.deleteAll = (req, res) => {

  Links.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Links were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Links."
      });
    });
};

// Find all Valid Link
exports.findAllValid = (req, res) => {
  Links.find({ valid: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Links."
      });
    });
};

