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
    .then(ress=>{
        //console.log(res)
        res.status(201).json({
            succuess: true,
            message:'add'+list
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            succuess: false,
            message:'add list have smoething wrong.'
        })
    })
})

router.post('/addsongtolist', (req, res, next) => {
    //const id = req.query.id
    const choselistname = req.body.choselistname
    const title = req.body.title
    const id = req.body.id
    console.log(choselistname)
    const list  = admin.firestore().collection(choselistname).doc()
    list.set({
    id: id,
    title: title
    })
    .then(ress=>{
        //console.log(res)
        res.status(201).json({
            succuess: true,
            message:'add'+title+'to'+choselistname
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            succuess: false,
            message:'add song to list have smoething wrong.'
        })
    })
    
})

router.get('/getlists', (req, res, next) => {
    const lists  = admin.firestore()
    lists.getCollections()
    .then(getCollections => {
        const collectionArray = []
        getCollections.forEach(collection => {
            //console.log('Found subcollection with id:', collection.id)
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