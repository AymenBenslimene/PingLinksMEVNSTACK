module.exports = app => {
    const links = require("../controllers/links.controller.js");
  
    var router = require("express").Router();
  
    // Create a new link
    //router.post("/", links.create);
    router.post("/webpage/:id", links.create);
    // Retrieve all links
    router.get("/", links.findAll);
  
    // Retrieve all valid link
    router.get("/valid", links.findAllValid);
  
    // Retrieve a single Link with id
    router.get("/:id", links.findOne);
  
    // Update a Link with id
    router.put("/:id", links.update);
  
    // Delete a Link with id
    router.delete("/:id", links.delete);
  
    // Delete all Links
    router.delete("/", links.deleteAll);
  
    app.use('/api/links', router);
  };