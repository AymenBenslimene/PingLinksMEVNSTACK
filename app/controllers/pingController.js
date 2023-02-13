const { testPingLink } = require('../models/pingLink.js');
const { testPingLink1 } = require('../models/pingLink.js');
const { testPingLink2 } = require('../models/pingLink.js');
const db = require("../models");
const WebPagedb = db.webPage;

module.exports.pingLinks = async function(req,res) {
//exports.pingLinks = (req, res) => {


    // Later we will get the pingLinks from the database
    /* WRITE THE GETTER */

    /*const pingLinks = [
        {
            targetLink: 'https://www.behance.net/contact6535',
            destinationLink: 'http://superpitch.fr/',
            result: 'Unknown'
        },
        {
            targetLink: 'https://filevirtuelle.com/index.php/pages/contact/',
            destinationLink: 'http://filevirtuelle.com/',
            result: 'Unknown'
        },
        {
            targetLink: 'https://filevirtuelle.com/index.php/pages/contact/',
            destinationLink: 'https://filevirtuelle.com/',
            result: 'Unknown'
        },
        {
            targetLink: 'https://www.linkedin.com/company/myseat',
            destinationLink: 'http://myseat.io/',
            result: 'Unknown'
        },
        {
            targetLink: 'https://twitter.com/CERBAIR',
            destinationLink: 'http://cerbair.com/',
            result: 'Unknown'
        },
        {
            targetLink: 'https://twitter.com/CERBAIR',
            destinationLink: 'http://cerbair.com',
            result: 'Unknown'
        }

    ];
    // Call the function to test the pingLinks
    testPingLink(pingLinks, function (test, result, size) {
        test.push(result);
        if (test.length == size) {
            res.send(test);
        }
    });
    */
    
    /** const webPage = [
        {
            url: 'https://www.behance.net/contact6535',
            itsLink: 'http://superpitch.fr/',
            valid: false
        },
        {
            url: 'https://twitter.com/CERBAIR',
            itsLink: 'http://superpitch.fr/',
            valid: false
        }
    
    
    ]*/

    //let webPage = WebPagedb.find();


    /* testPingLink1(webPage, function (test, result, size) {
        //res.send(webPage);
        test.push(result);
        if (test.length == size) {
            res.send(test);
        }
    }); */

    testPingLink2(req.body.url,req.body.itsLink, function (containLink) {
        //res.send(webPage);
        //test.push(result);
        //if (test.length == size) {
            res.send(containLink);
        //}
    });
    
}