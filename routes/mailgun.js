
// copied from mailgun's website for node.js


const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAIL_GUN_API,
});

mg.messages
	.create(sandbox1c422713a9c34dd39f0beeb268d1e285.mailgun.org, {
		from: "Mailgun Sandbox <postmaster@sandbox1c422713a9c34dd39f0beeb268d1e285.mailgun.org>",
		to: ["dechantg@gmail.com"],
		subject: "Hello",
		text: "Testing some Mailgun awesomness!",
	})
	.then(msg => console.log(msg)) // logs response data
	.catch(err => console.log(err)); // logs any error`;


// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.
