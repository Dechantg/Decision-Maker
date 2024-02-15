
Decision Maker
=========

# Project Overview

Decision maker is a ranked voting poll for people to use to make group decisions. It allows the users to upload however many options they want, and can add however emails they way. The poll is automatically emailed to all participants with an administration link sent to the creator. Any new emails are automatically saved to the database but flagged as still needing the user to sign up. Poll results return the top 3 choices showing their scores. Ranked votes are calculated by the PostgreSQL server.


### LHL Midterm Project Note:

This is a fork and completion of my midterm project from lighthouse labs. Due to unavoidable loss of group mate during project we were unable to finsh at the time. I have taken the time to fork the project and finish it for my personal github


### Contributors:
Github for contributors for project:
- @cknowles90 (forked from his repository)
- @dechantg


# Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Dotenv 2.0.0 or above
- Express 4.17.1 or above
- Mailgun 0.5.0 or above
- Uuid 9.0.1 or above
- Bcrypt 5.1.1 or above
- Body-parser 1.20.2 or above
- Moment 2.30.1 or above

# Install




# To-Do List

- refactor code to remove scripts from ejs files into helper files and reuse code when possible.
- remove unused query files.
- removed unused script files or repurpose when moving scripts out of ejs.
- Refactor last two routes still using moment while rest configured to standard use helper file.


# Screenshots

[Video of website in use](https://www.youtube.com/watch?v%253DhEuZDjR6g4Q)

!["Screenshot of Login/Home Page"](https://github.com/Dechantg/Decision-Maker/blob/master/docs/home-page.jpg)
!["Screenshot of Registration Page"](https://github.com/Dechantg/Decision-Maker/blob/master/docs/register-page.jpg)
!["Screenshot of Poll List Page"](https://github.com/Dechantg/Decision-Maker/blob/master/docs/poll-list-page.jpg)
!["Screenshot of Create Poll Page"](https://github.com/Dechantg/Decision-Maker/blob/master/docs/create-poll-page.jpg)
!["Screenshot of Voting Page"](https://github.com/Dechantg/Decision-Maker/blob/master/docs/vote-page.jpg)
!["Screenshot of Poll Results Page"](https://github.com/Dechantg/Decision-Maker/blob/master/docs/poll-results-page.jpg)
!["Screenshot of Admin List Page"](https://github.com/Dechantg/Decision-Maker/blob/master/docs/admin-list-page.jpg)
!["Screenshot of Admin Page"](https://github.com/Dechantg/Decision-Maker/blob/master/docs/admin-page.jpg)
