require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



async function sendMail(mailList){


  let t = "<div><table><thead><tr><th>Timestamp</th><th>URL</th><th>Link</th></tr></thead>";
  t += "<tbody>";
 
  mailList.forEach(function myFunction(value) {
    t += "</tr>";
    t += "<td>" + value.updatedAt + "</td>";
    t += "<td>" + value.url + "</td>";
    t += "<td>" + value.itsLink + "</td>";
    t += "</tr>";
  });

  t += "</tbody></table></div>";


  const msg = {
    to: 'waldye19@gmail.com', 
    from: 'testmailpfe44@gmail.com', 
    subject: 'Inactive Links',
    html: t,
  }

  sgMail
  .send(msg)
  .then((response) => {
  })
  .catch((error) => {
    console.error(error)
  })
}

module.exports = { sendMail };