const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const admin = require('firebase-admin');

router.post('/addlist', (req, res, next) => {
    //const id = req.query.id
    const listname = req.body.listname
    const uid = req.body.uid
    console.log(listname)
    const UidList  = admin.firestore().collection(uid).doc('lists').collection(listname).doc()
    UidList.set({
        id:''
    })
    .then(ress=>{
        //console.log(res)
        res.status(201).json({
            succuess: true,
            message:'add'+UidList
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
    const uid = req.body.uid
    const choselistname = req.body.choselistname
    const title = req.body.title
    const id = req.body.id
   // console.log(choselistname)
    const a = admin.firestore().collection(uid).doc('lists').collection(choselistname).where('id', '==', '').get()
    .then(ress=>{
        ress.forEach(doc =>{
           doc.ref.delete()
        })
        
    })
    const list  = admin.firestore().collection(uid).doc('lists').collection(choselistname).doc()
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

router.delete('/deletesongonlist',(req,res,next) => {
    const uid =  req.body.uid
    const listname = req.body.listname
    const Id =  req.body.id
    console.log(listname+'  '+Id)
    const del = admin.firestore().collection(uid).doc('lists').collection(listname).where('id', '==', Id).get()
    .then(ress=>{
        ress.forEach(doc =>{
           doc.ref.delete()
        })
        res.status(200).json({
            succuess: true,
            'message':'deletesongonlist succuess'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            succuess: false,
            message:'deletesongonlist smoething wrong.'
        })
    })
    
})

router.get('/getlists', (req, res, next) => {
    const uid = req.query.uid
    const lists  = admin.firestore().collection(uid).doc('lists')
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
router.get('/getlistsongs', (req, res, next) => {
    const listNmae = req.query.listname
    const uid = req.query.uid
    const songs =[]
    const listRef = admin.firestore().collection(uid).doc('lists').collection(listNmae)
    listRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            songs.push(doc.data())
            //console.log(doc.id, '=>', doc.data())
          })
        res.status(200).json({
            message:'get list Songs',
            succuess: true,
            songs:songs
        })
    })
    .catch(err => {
      console.log('Error getting documents', err)

      res.status(200).json({
        message:'get list Songs have something wrong.',
        succuess: false
    })
    })
})


module.exports = router;