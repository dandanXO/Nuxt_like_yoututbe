const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const admin = require('firebase-admin');

router.get('/add', (req, res, next) => {
    //const id = req.query.id

    const list  = admin.firestore().collection('list1').doc()
    list.set({
        id:'DeXoACwOT1o',
    title:'2-Hours Epic Music Mix | THE POWER OF EPIC MUSIC - Full Mix Vol. 2'
    })
    res.status(201).json({
        id:'DeXoACwOT1o',
    title:'2-Hours Epic Music Mix | THE POWER OF EPIC MUSIC - Full Mix Vol. 2'
    });
})

module.exports = router;