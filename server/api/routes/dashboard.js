const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'this dashborad api page'
    })
})

module.exports = router;