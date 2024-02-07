
// copied from mailgun's website for node.js


const mailgun = require('mailgun-js')({
  apiKey: process.env.MAIL_GUN_API,
  domain: process.env.MAIL_GUN_DOMAIN
});

const sendEmail = async (pollDataToEmail) => {

const {email, uuid, firstName, lastName, pollName, pollDescription, creatorEmail, opensAt, closesAt } = pollDataToEmail

const data = {
  from: "polls@decisionmaker.com",
		to: [email],
		subject: `Poll for ${pollName}`,
		text:`

    Hi ${email}!!

    You have been invited to take part in a Decision Maker poll by ${firstName} ${lastName} at ${creatorEmail}!

    The poll is for:
    Name: ${pollName},
    Description: ${pollDescription}

    The poll opens at ${opensAt} and closes at ${closesAt}!!

    You can find the link at http://localhost:3000/results/${uuid}

    Cheers,
    The Decision Maker Team


    `,
};

try {
  // const body = await mailgun.messages().send(data);
  console.log('Email sent:');
  return data;
} catch (error) {
  console.error('Error sending email:', error);
  throw error;
}
};

const sendAdminEmail = async (pollDataToEmail) => {

  const {email, uuid, firstName, lastName, pollName, pollDescription, creatorEmail, opensAt, closesAt } = pollDataToEmail

  const data = {
    from: "polls@decisionmaker.com",
      to: [creatorEmail],
      subject: `Poll Creator Email for ${pollName}`,
      text:`

      Hi ${firstName} ${lastName}!!

      This is to confirm that your poll has been created and emailed out!!

      The poll is for:
      Name: ${pollName},
      Description: ${pollDescription}

      The poll opens at ${opensAt} and closes at ${closesAt}!!

      You can find the link at http://localhost:3000/results/${uuid}

      You can find the administrive link for the poll at:
      http://localhost:3000/admin/${uuid}

      Cheers,
      The Decision Maker Team


      `,
  };

  try {
    // const body = await mailgun.messages().send(data);
    console.log('Admin Email sent:');
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
  };


module.exports = {sendEmail, sendAdminEmail};

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.
