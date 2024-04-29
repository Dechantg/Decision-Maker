

const express           = require('express');
const router            = express.Router();



const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD
  }
});
``
router.post('/', async (req, res) => {
    const { email, subject, message, name } = req.body;

    console.log("here is the email from front end", email)
    console.log("here is the Name from front end", name)
    console.log("here is the subject from front end", subject)
    console.log("here is the message from front end", message)

  
    const emailData = {
      from: 'info@dechantg.com',
      to: 'gregory@dechantg.com',
      subject: subject,
      text: `
        You have recieved a new message from: ${name}
        
        at: ${email}:

        Subject: ${subject}

        message:

        ${message}

      `,
    };

    const autoReplyData = {
        from: 'do-not-reply@dechantg.com',
        to: email,
        subject: `Thank you for your inquiry`,
        text: `
          Hi ${name}!!
    
          Thank you for your inquiry. I will get back to you as quickly as possible!!
          
          Please see below to confirm your subject and message.


          Subject: ${subject}

          Message:
          ${message}


        `,
      };


      console.log("here is the autoReply", autoReplyData)
      console.log("here is the message email", emailData)
  
    try {
      // Send email using nodemailer transporter
      const emailInfo = await transporter.sendMail(emailData);
      const replyInfo = await transporter.sendMail(autoReplyData);

      console.log('Email sent:', emailInfo.response);
      console.log('Email sent:', replyInfo.response);


      res.status(200).json({ message: "Email's sent successfully" });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });




  module.exports = router;

