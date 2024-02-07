
const userExists = require('../../db/queries/user_email_exists');

const processEmails = async (emails) => {
  const idsToAuthorize = {};
  const emailsToAdd = [];

  for (const email of emails) {
    const userEmail = await userExists(email);

    if (userEmail && userEmail.id) {
      idsToAuthorize[userEmail.id] = true;
    } else {
      emailsToAdd.push(email);
    }
  }

  const authorizedIds = Object.keys(idsToAuthorize);

  return { authorizedIds, emailsToAdd };
};

module.exports = processEmails;
