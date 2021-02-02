# Reddit Newsletter Backend by Vedant Singhania

## Description

This is a simple service used to construct a personalized reddit newsletter for subscribing users. Daily the users should receive an email with the top 3 most voted posts of their favorite subreddits.

Features implemented:
- create and update users
- create and update a user's favorite subreddit
- triggering the sendout of a newsletter
- automated testing

## Design choices

- Since this was a short, timed exercise I decided to use json local storage for my data models rather than something like MySql for relational DBs or MongoDB/DynamoDB for a NoSQL DB type.
- I used 2 routes, /user and /newsletter to separate concerns
- all request/response communication in json

## Assumptions

- I'm assuming that a cron job would trigger the /newsletter/send endpoint that I've built out. The granularity of the time that a user can user to determine newsletter send out time, will determine how often the cron job runs. For example, if a user can select their send out time down to the minute - this cron jjob would have to run every minute to see which user is scheduled to send!
- I've mocked the subreddits and their 3 top voted posts - ideally these would be retrieved from the Reddit API or through web scraping.

## Future Work

- Letting users decide their specific newsletter send out time
- Toggling newsletter send preference
- Let users decide which service to send newsletter to (Email, Slack, Whatsapp, etc)


## Instructions for Use

1. Clone repo to a local folder
2. Navigate to that folder (using command line)
3. ```npm install```

### Automated Testing

1. ```npm run test``` - this will initiate the mocha/chai tests

### Manual Testing

1. Start the server ```npm start```
2. Visit http://localhost:3000/
3. Test endpoints (using Postman, etc.)
