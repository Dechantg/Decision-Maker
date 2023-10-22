# MUST HAVE

must enter an email to create poll [1]

Ability to create a poll [0]
  - multiple choices/options [0]
  - include a description for the poll/vote choices [0]
  - linked to email of creater (user id)
  - issue an ecrypted cookie to creater of poll
  
creator receives email with links post creation
  - poll created must generate two links [2,3]
  - administrative link for the creator to view results [2]
  - shareable/submission link for the creator to send to the voters [3]

must be able to send emails to users and receive emails [3]
  - needs to receive emails when a vote has been submitted

Ability to vote on poll 
  - voting user must enter email/name to clarify their right to vote in THIS poll
  - display ranking options for the available votes accordingly (3, 2, 1 etc)
  - linked to email of vote as invited by creater

admin page displays the results
  - new link of final results to share with those that voted?
  

# GOOD TO HAVE

ability to invite more users to poll after creation
  - creator can determin number of changes of mind
  - 
ability to set time limits on poll and indicate time remaining

admin page displays the results
  - time left
  - votes cast/not cast

admin can edit/alter the poll

# NICE TO HAVE

ability to change votes
ability to set a start time on poll



// const getAllReservations = function (guest_id, limit = 10) {

//   values = [guest_id, limit];

//   const queryString = `
//   SELECT reservations.id, title, number_of_bedrooms, number_of_bathrooms, parking_spaces, thumbnail_photo_url, cost_per_night, start_date, AVG(rating) AS average_rating
//   FROM reservations
//   JOIN properties ON properties.id = property_id
//   JOIN property_reviews ON reservation_id = reservations.id
//   WHERE reservations.guest_id = $1
//   GROUP BY reservations.id, properties.title, properties.cost_per_night, number_of_bedrooms, number_of_bathrooms, parking_spaces, thumbnail_photo_url
//   ORDER BY start_date
//   LIMIT $2;
//   `

//   return pool
//   .query(queryString, values)
//   .then((result) => {
//     console.log(result);
//     return result.rows;
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// };
