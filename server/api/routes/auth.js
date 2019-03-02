const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const admin = require('firebase-admin')
const firebase = require('firebase')

router.post('/signUp',islogin, (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    admin.auth().createUser({
        email: email,
       
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

router.post('/signIn',islogin,(req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    firebase.auth().signInWithEmailAndPassword(email, password)
            .then((users) =>{
                const user = firebase.auth().currentUser;
            
                //console.log('sing in successful   ',users)
                res.status(200).json({message:'successful signin!',signinStatus: true,user:user})
                return
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('sing in failed! '+error)
                res.status(200).json({message:error.message,signinStatus: false})
            })
    
})

router.post('/otherSinginCheck',(req, res, next)=>{
    const token =req.body.token
    console.log(token)
    admin
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        const user = decodedToken
        console.log(user)
        res.status(200).json({message:'successful signin!',signinStatus: true,user:user})
      })
   
})




router.get('/signOut', (req, res, next) => {
    firebase.auth().signOut()
    .then(() =>{
        console.log('sing out successful')
        res.status(200).json({message:'successful sign out!',signinStatus: false,user:null})
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('sing out failed!')
        res.status(200).json({message:error.message,signinStatus: false})
    })
})
function islogin(req,res,next){
    const user = firebase.auth().currentUser;
    if(user!== null){
        console.log('sign in already')
        res.status(200).json({message:' signin already',signinStatus: true,user:user})
        res.end()
    }else{
        next();
    }
}

module.exports = router