
# Routing Template

-----------------------------------------------

## HOME PAGE

localhost:8080/

- contains textbox to enter email to check on polls
- issues encrypted cookie based on user_id and/or email

-----------------------------------------------

## Poll creation page

localhost:8080/poll/create

*contains form to submit new poll*

- Creator email
- Creator name

- Poll title
  - Poll Description

- Options (3 empty spaces to start)
  - Option Title
  - short option description
  - button to add addition options
  - each option has ability for poll create to register their vote at creation

- People who can vote section/ invites (intial 5 people)
  - ~~First, Last name entry of people eligable to vote~~ (avoid potential typos as issues - just require emails for now)
  - email of people eligable to vote
  - add additonal voter button

- Clicking submit posts form data to database and redirects to poll list page
  - send out invite emails to add eligable voters
  - emails creator link to poll page and admin page
  - ~~creates unique id based on 6 character generator (tinyapp style)~~ (included in users.js file currently)

-----------------------------------------------

## Poll viewing(public/invitees only) page

localhost:8080/polls

- based on email(cookie) contains list of polls eligable to control - links to polls
  - link redirects to localhost:8080/admin/:id

- base on email(cookie) contains list of polls eligable to vote on - links to polls
  - link redirects to localhost:8080/vote/:id

-----------------------------------------------

## Poll admin page

localhost:8080/admin/:id

- shows title and description of poll
  - shows list of options

- shows time remaining on poll

- shows number of users who have voted

- shows current results talley

- when applicable shows final result

-----------------------------------------------

## Poll voting page

localhost:8080/vote/:id

*poll voting page*

- contains list of options (title and description)
  - edgecase - ability to see/navigate to other polls theyre invited/apart of (that are active)

- contains title of poll

- contains description of poll

- contains name of creator of poll

- contains input for name and email of voter to validate against list of eligable voters
  - if valid session cookie exists it shows name and user of voter automatically

- contains container for registering vote
  - stretch ideal is a drag and drop of numbers 1, 2, 3
  - maybe a clickable selection table like so       3 2 1  (3 > 1)
                                                    o o o

- If user has already voted it displays their selected options/choices

- button to submit users votes registers selections in database and refreshes page to reflect
  - notifys the admin of a vote being cast
  - (stretch second column that shows current top three but only after user has registered their votes)
  - runs calculation of poll from database from all submitted choices linked to that poll and pushes updated results into polls database

- link to return to list of polls user is involved in


-----------------------------------------------
-----------------------------------------------


(stretch page)
## admin - polls history page

*shows the admin/creator's (while logged in/signed in etc) whole history of polls created, and polls participated in.*
