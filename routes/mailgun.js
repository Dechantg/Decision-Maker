
// copied from mailgun's website for node.js


const mailgun = require('mailgun-js')({
  apiKey: process.env.MAIL_GUN_API,
  domain: process.env.MAIL_GUN_DOMAIN
});


// const data = {
//   from: "greg@apresandadventure.com",
// 		to: ["dechantg@gmail.com"],
// 		subject: "Hello",
// 		text: "Testing some Mailgun awesomness!",
// };



// mailgun.messages().send(data, (error, body) => {
//   if (error) {
//     console.error('Error sending email:', error);
//   } else {
//     console.log('Email sent:', body);
//   }
// });

module.exports = mailgun;

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.
