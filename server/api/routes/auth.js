const express = require('express')
const router = express.Router()
const request = require('superagent')
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

router.get('/githubCallback', (req, res, next) =>{
    const {query}=req
    const {code} = query
    //console.log('req',req)
    if(!code){
        res.send({
            success: false,
        })
    }
    request
    .post('https://github.com/login/oauth/access_token')
    .send({ 
        client_id: '77989c6365a88c734a5c',
        client_secret: 'c0ef4b7e1fdfa9aee9993d48d766ee28125945e6',
        code: code })
    .set('Accept', 'application/json')
    .then(result => {
      const data = result.body
        request
        .get(`https://api.github.com/user`)
        .set('Authorization', `token ${data.access_token}`)
        .then(result => {
            res.send(result.body)
        });
    });
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