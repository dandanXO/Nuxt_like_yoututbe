const express = require('express')
const router = express.Router()
const admin = require('firebase-admin');

router.post('/setFavorite', (req, res, next) => {
    console.log(req.body.listName)
    const listName = req.body.listName
    const id = req.body.id
    console.log(id)
    const uid = req.body.uid
    const uidSong = admin.firestore().collection(uid).doc('lists').collection(listName).doc(id)
    
    uidSong.set(
        { favorite: true },
        { merge: true }
    ).then(
        uidSong.get()
        .then(doc => {
            res.status(201).json({
                songData:doc.data()
            })
        })
    )

})
router.post('/removeFavorite', (req, res, next) => {
    console.log(req.body.listName)
    const listName = req.body.listName
    const id = req.body.id
    console.log(id)
    const uid = req.body.uid
    const uidSong = admin.firestore().collection(uid).doc('lists').collection(listName).doc(id)
    uidSong.set(
        { favorite: false },
        { merge: true }
    ).then(uidSong.get()
        .then(doc => {
            res.status(201).json({
                songData:doc.data()
            })
        }))
})
module.exports = router;