const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const admin = require('firebase-admin')
const firebase = require('firebase')
router.post('/signUp', (req, res, next) => {
    const email = req.body.email
    const password = req.bodtpassword

    admin.auth().createUser({
        email: email,
        emailVerified: false,
        password: password,
    })
    .then((userRecord) =>{
        console.log("Successfully created new user:", userRecord.uid)
        res.status(200).json({message:'successful sign Up!',signupStatus: true})
    })
    .catch(function(error) {
        console.log("Error creating new user:", error);
        res.status(200).json({message:'signup failed!  '+error ,signupStatus: false}) 
    })
})

router.post('/signIn', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() =>{
        
        console.log('sing in successful')
        res.status(200).json({message:'successful signin!',signinStatus: true})
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('sing in failed!')
        res.status(200).json({message:error.message,signinStatus: false})
    })
})

router.post('/signOut', (req, res, next) => {


    firebase.auth().signOut()
    .then(() =>{
        
        console.log('sing out successful')
        res.status(200).json({message:'successful sign out!',signoutStatus: true})
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('sing in failed!')
        res.status(200).json({message:error.message,signoutStatus: false})
    })
})


module.exports = router