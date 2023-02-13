module.exports = app => {
    const webPage = require("../controllers/webPage.controller.js");
  
    var router = require("express").Router();
  
    // Create a new webPage
    //router.post("/", webPage.create);
    router.post("/", webPage.pingLinksCreate);

    // Check Ping Links for the job 
    router.get("/schedule/check",webPage.pingLinksCheck );


    // Retrieve all webPages
    router.get("/", webPage.findAll);
    // Retrieve all webPages by User ID 
    router.get("/all/:userid", webPage.findAllbyUserID);

    // Retrieve all History webPages
    router.get("/history", webPage.findAllHistory);
    // Retrieve all History webPages by User ID
    router.get("/history/:userid", webPage.findAllHistorybyUserID);
    
    // Retrieve a single webPage with id
    router.get("/:id", webPage.findOne);
  
    // Update a webPage with id
    router.put("/:id", webPage.update);
  
    // Delete a webPage with id
    router.delete("/:id", webPage.delete);
    // Delete all wepage by userid
    router.delete("/all/remove/:userid", webPage.deleteAllbyUserID);
    
    // Delete all webPage
    router.delete("/", webPage.deleteAll);

    // Add Link to a web page 
    router.post("/addLink", webPage.addLinkTowebPage);
    
    app.use('/api/webPage', router);

  // solution 
    const pingger = require("../controllers/pingController.js");

    // ping all the links need to write localhost:8080/api/webPage/api/ping/pingLinks  
    router.get("/api/ping/pingLinks", pingger.pingLinks);

    //router.get("/api/ping/pingLinks/t", pingger.);

    // All the routes contains in this file will be prefixed by /api/ping
    //app.use('/api/ping', router);
  };