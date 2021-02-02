const express = require('express');
const router = express.Router();
const models = require('../models');
let users = models.users;
let user_preferences = models.user_preferences;
 
/*
 * GET /user to list all users.
 */
router.get('/', (req, res) => {
    return res.json(users);
});


/*
 * POST /user/add to create a new user.
 */
router.post('/add', (req, res) => {
    const user = req.body;
    
    // Output the user to the console for debugging
    console.log(user);

    // required params missing from post request body
    if(user.id == null || user.name == null || user.email == null) {
        return res.status(401).send({error: true, msg: 'User data missing. Please send all required information.'})
    }

    // ideally the DB would be producing the ids for us (no collisions)
    //check if the id (unique) exists already
    const findExistingId = users.find( existingUser => existingUser.id === user.id )
    if (findExistingId) {
        return res.status(409).send({error: true, msg: 'User Id already exist. Please enter another email address.'})
    }

    //check if the email (unique) exists already
    const findExistingEmail = users.find( existingUser => existingUser.email === user.email )
    if (findExistingEmail) {
        return res.status(409).send({error: true, msg: 'Email already exist. Please enter another email address.'})
    }

    // save user to datastore
    users.push(user);

    return res.status(200).send({success: true, msg: 'User added successfully!'});
});
   
/*
 * PUT /user/:id to update a user.
 */
router.put('/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;
    const newUser = req.body;

    //check if the user being updated exists
    const findExistingId = users.find( existingUser => existingUser.id === id )
    if (!findExistingId) {
        return res.status(401).send({error: true, msg: 'User does not exist.'})
    }

    // required params missing from post request body
    if(newUser.name == null || newUser.email == null) {
        return res.status(401).send({error: true, msg: 'User data missing. Please send all required information to update user.'})
    }

    // Remove user from the users array
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.id === id) {
            users[i] = newUser;
        }
    }

    return res.status(200).send({success: true, msg: 'User updated successfully!'});
});

/*
 * DELETE /user/:id to delete a user.
 */
router.delete('/:id', (req, res) => {
    // Reading user id from the URL
    const id = req.params.id;

    //check if the user being updated exists
    const findExistingId = users.find( existingUser => existingUser.id === id )
    if (!findExistingId) {
        return res.status(401).send({error: true, msg: 'User does not exist.'})
    }

    // Remove user from the users array
    users = users.filter(i => {
        if (i.id !== id) {
            return true;
        }
        return false;
    });

    return res.status(200).send({success: true, msg: 'User deleted successfully!'});
});


/*
 * POST /user/:id/subreddits to create a user's favorite subreddits.
 */
router.post('/:id/subreddits', (req, res) => {
    const id = req.params.id;

    //check if the user exists
    const findExistingId = users.find( existingUser => existingUser.id === id )
    if (!findExistingId) {
        return res.status(401).send({error: true, msg: 'User does not exist.'})
    }

    const favoriteSubreddits = req.body;
    // check if request contains subreddits
    if(!favoriteSubreddits.hasOwnProperty('subreddits')){
        console.log(favoriteSubreddits);
        return res.status(401).send({error: true, msg: 'Favorite Subreddits missing.'})
    }
    // **If user has favorite subreddits - override them. Conscious design decision.**
    // Update users favorite subreddit in the user_preference table/datastore
    var user_preference  = {};
    user_preference.userId = id;
    user_preference.favorite = favoriteSubreddits;
    user_preference.sendOutTime = '08:00'; // default time
    user_preference.sendOutNewsletter = 'True';
    // Output the user_preference to the console for debugging
    console.log(user_preference);
    user_preferences.push(user_preference);

    return res.status(200).send({success: true, msg: 'Favorite Subreddits added.'});
});

/*
 * PUT /user/:id/subreddits to update a user's favorite subreddits.
 */
router.put('/:id/subreddits', (req, res) => {
    const id = req.params.id;

    //check if the user exists
    const findExistingId = users.find( existingUser => existingUser.id === id )
    if (!findExistingId) {
        return res.status(401).send({error: true, msg: 'User does not exist.'})
    }

    const favoriteSubreddits = req.body;
    // check if request contains subreddits
    if(!favoriteSubreddits.hasOwnProperty('subreddits')){
        console.log(favoriteSubreddits);
        return res.status(401).send({error: true, msg: 'Favorite Subreddits missing.'})
    }
    // **If user does not have favorite subreddits - create them. Conscious design decision.**
    // Update users favorite subreddit in the user_preference table/datastore
    var user_preference  = {};
    user_preference.userId = id;
    user_preference.favorite = favoriteSubreddits;
    user_preference.sendOutTime = '08:00'; // default time
    user_preference.sendOutNewsletter = 'True';
    // Output the user_preference to the console for debugging
    console.log(user_preference);
    user_preferences.push(user_preference);

    return res.status(200).send({success: true, msg: 'Favorite Subreddits added.'});
});


module.exports = router;
