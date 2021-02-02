const express = require('express');
const router = express.Router();
const models = require('../models');
let users = models.users;
let user_preferences = models.user_preferences;
let subreddits = models.subreddits;


/*
 * GET /newsletter/send to trigger the sendout of a subreddit newsletter.
 */
router.get('/send', (req, res) => {

    // check the current time
    var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false });
    console.log("Time of triggering endpoint: ",currentTime);

    // hardcoded assuming this endpoint is triggered at 8am (and for testing)
    // Ideally this endpoint would be triggered by a cronjob multiple times in a day (depending on how specific the user can get with the send out time selection),
    // once a cron hits this endpoint, we check which users are on schedule and send the newsletter payload to the email service.
    currentTime = '08:00';
    console.log("Assuming current time: ", currentTime);
    var emailPayload = [];

    // check user_preference sendOutTime to see if there's a match
    for(const user_preference of user_preferences){
        if(user_preference.sendOutTime == currentTime){
            var user = users.find((item) => item.id == user_preference.userId);
            var favoriteSubreddits = user_preference.favorite.subreddits;
            console.log("found user: ", user);
            console.log("found user preferences: ", user_preference);
            var newsletter = {};
            var content = [];
            newsletter.name = user.name;
            // mocking a call to my datastore - would ideally get this information from reddit API or through scraping (if possible)
            for (const favoriteSubreddit of favoriteSubreddits){
                for (const subreddit of subreddits){
                    if(favoriteSubreddit == subreddit.name){
                        content.push(subreddit);
                    }
                }
            }
            newsletter.content = content;
            console.log("Newsletter payload", newsletter);
            emailPayload.push(newsletter);
        }
    }
    /*
    / Logging the email payload send out to the email service
    **/
    console.log("Email payload", emailPayload);

    return res.status(200).send({success: true, message: "Newsletter sent!", emailPayload: emailPayload});
});

module.exports = router;
