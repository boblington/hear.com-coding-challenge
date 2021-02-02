// Mock models being used for this project. Ideally, a persistent data store such as MySql would be used to store and retrieve this information.

// Users - mock data
let users = [
    {
        "id":"1",
        "name":"Fred",
        "email": "fred@test.com"
    }
];

// User preferences - favorite subreddits, time of delivery, etc.
let user_preferences = [
    {
        "userId": 1,
        "sendOutTime": "08:00", // default
        "sendOutNewsletter": "True", // default
        "favorite": {
            "subreddits":["r/worldnews", "r/funny"]
        }
    }
];

// mock list of subreddits - would pull these from Reddit API or scraping Reddit for production level system.
let subreddits = [
    {
        "name": "r/worldnews",
        "most_voted": [
            {
                "title": "South park creators...",
                "votes": "76K",
                "image": "image.png"
            },
            {
                "title": "The US just..",
                "votes": "43K",
                "image": "image.png"
            },
            {
                "title": "China sends..",
                "votes": "6K",
                "image": "image.png"
            }
        ]
    },
    {
        "name": "r/funny",
        "most_voted": [
            {
                "title": "ATM Machine..",
                "votes": "12K",
                "image": "image.png"
            },
            {
                "title": "Halloween decoration...",
                "votes": "9K",
                "image": "image.png"
            },
            {
                "title": "You guys must be joking",
                "votes": "6K",
                "image": "image.png"
            }
        ]
    },
    {
        "name": "r/business",
        "most_voted": [
            {
                "title": "Elon Musk...",
                "votes": "19K",
                "image": "image.png"
            },
            {
                "title": "Solar Roof...",
                "votes": "8K",
                "image": "image.png"
            },
            {
                "title": "You guys must be joking",
                "votes": "6K",
                "image": "image.png"
            }
        ]
    }

];



module.exports = {
    users,
    subreddits,
    user_preferences
};