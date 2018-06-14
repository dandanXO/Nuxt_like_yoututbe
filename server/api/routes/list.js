const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const admin = require('firebase-admin');

router.post('/addlist', (req, res, next) => {
    //const id = req.query.id
    const listname = req.body.listname
    console.log(listname)
    const list  = admin.firestore().collection(listname).doc()
    list.set({
    id:'',
    title:''
    })
    res.status(201).json({
        message:'addlist'
    });
})

router.get('/getlists', (req, res, next) => {
    const lists  = admin.firestore()
    lists.getCollections()
    .then(getCollections => {
        const collectionArray = []
        getCollections.forEach(collection => {
            console.log('Found subcollection with id:', collection.id)
            collectionArray.push(collection.id)
        })
    return collectionArray
    })
    .then(collectionArray =>{
        res.status(201).json({
            lists: collectionArray
        });
    })
    .catch(err =>{
        console.log("Error getting document++++++++" +err)
    })
   
})

module.exports = router;