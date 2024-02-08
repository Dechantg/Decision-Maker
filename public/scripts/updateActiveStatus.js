
const activatePolls = require('../../db/queries/activate_polls')

const updatedExpiredStatus = require('../../db/queries/update_expired_status');


const updateActiveStatus = async () => {

updatedExpiredStatus();
console.log("expired status run")
activatePolls();
console.log("poll activation run")


const currentTime = new Date();


console.log("Cron has issued the updates at: ", currentTime)

};

module.exports = updateActiveStatus;
