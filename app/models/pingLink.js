const request = require('request');
const cheerio = require('cheerio');


function testPingLink(pingLinks, callback) {

  
  var test = [];
  // for each link in the array, we check if the link is present in the destinationLink
  for (let element of pingLinks) {
    // we use the request module to get the html of the destinationLink
    request(element.destinationLink, function (error, response, body) {
      // if there is an error, we return it
      if (error) { return console.error('There was an error!', error); }
      let containLink = 'Not found';
      // we use the cheerio module to parse the html
      var $ = cheerio.load(body);
      // we check if the link is present in the html
      $('a').each(function () {
        var text = $(this).text();
        var link = $(this).attr('href');
        let bool = text.match(element.targetLink);
        // if the link is present, we set the containLink variable to true
        if ((link && link === element.targetLink) || bool) {
          containLink = 'Found';
        };
      });
      // Construct the object to send to the frontend
      let obj = {
        targetLink: element.targetLink,
        destinationLink: element.destinationLink,
        result: containLink
      }
      callback(test, obj, pingLinks.length);
    });
  }
}


function testPingLink1(webPage, callback) {

  
  var test = [];
  // for each link in the array, we check if the link is present in the destinationLink
  for (let element of webPage) {
    // we use the request module to get the html of the destinationLink
    request(element.itsLink, function (error, response, body) {
      // if there is an error, we return it
      if (error) { return console.error('There was an error!', error); }
      let containLink = false;
      // we use the cheerio module to parse the html
      var $ = cheerio.load(body);
      // we check if the link is present in the html
      $('a').each(function () {
        var text = $(this).text();
        var link = $(this).attr('href');
        let bool = text.match(element.url);
        // if the link is present, we set the containLink variable to true
        if ((link && link === element.url) || bool) {
          containLink = true;
        };
      });
      // Construct the object to send to the frontend
      let obj = {
        url: element.url,
        itsLink: element.itsLink,
        valid: containLink
      }
      callback(test, obj, webPage.length);
    });
  }
}

function testPingLink2(url, itsLink, callback) {

  var test = [];
  // for each link in the array, we check if the link is present in the destinationLink
  //for (let element of webPage) {
    // we use the request module to get the html of the destinationLink
    request(itsLink, function (error, response, body) {
      // if there is an error, we return it
      if (error) { return console.error('There was an error!', error); }
      let containLink = false;
      // we use the cheerio module to parse the html
      var $ = cheerio.load(body);
      // we check if the link is present in the html
      $('a').each(function () {
        var text = $(this).text();
        var link = $(this).attr('href');
        let bool = text.match(url);
        // if the link is present, we set the containLink variable to true
        if ((link && link === url) || bool) {
          containLink = true;
        };
      });

      //let obj = containLink;
      return callback(containLink);
    });
  //}
}

module.exports = { testPingLink,testPingLink1,testPingLink2};

