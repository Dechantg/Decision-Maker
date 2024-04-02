
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD
  }
});
``
const sendEmail = async (pollDataToEmail) => {
  const { emails, uuid, firstName, lastName, pollName, pollDescription, creatorEmail, opensAt, closesAt } = pollDataToEmail;

  for (const email of emails) {
    const data = {
      from: "do-not-reply@decisionmaker.ca",
      to: [email],
      subject: `Poll for ${pollName}`,
      text: `
        Hi ${email}!!

        You have been invited to take part in a Decision Maker poll by ${firstName} ${lastName} at ${creatorEmail}!

        The poll is for:
        Name: ${pollName},
        Description: ${pollDescription}

        The poll opens at ${opensAt} and closes at ${closesAt}!!

        You can find the link at http://decisionmaker.ca/results/${uuid}

        Cheers,
        The Decision Maker Team
      `,
    };

    try {
      const body = await transporter.sendMail(data, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
      throw error;
    }
  }
};




const sendAdminEmail = async (pollDataToEmail) => {

  const {emails, uuid, firstName, lastName, pollName, pollDescription, creatorEmail, opensAt, closesAt } = pollDataToEmail

  const data = {
    from: "info@decisionmaker.ca",
      to: [creatorEmail],
      subject: `Poll Creator Email for ${pollName}`,
      text:`

      Hi ${firstName} ${lastName}!!

      This is to confirm that your poll has been created and emailed out!!

      The poll is for:
      Name: ${pollName},
      Description: ${pollDescription}

      The poll opens at ${opensAt} and closes at ${closesAt}!!

      You can find the link at http://decisionmaker.ca/results/${uuid}

      You can find the administrive link for the poll at:
      http://decisionmaker.ca/admin/${uuid}

      Cheers,
      The Decision Maker Team


      `,
  };

  try {
    const body = await transporter.sendMail(data, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      } else {
          console.log('Email sent:', info.response);
      }
  });
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
  };


module.exports = {sendEmail, sendAdminEmail};

