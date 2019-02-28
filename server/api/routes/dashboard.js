const express = require('express')
const router = express.Router()
var rp = require('request-promise')

router.get('/', (req, res, next) => {

    const options = {
        uri: 'https://www.googleapis.com/youtube/v3/search',
        qs: {
            key: 'AIzaSyB55WKq_l05TmayuCn_gIQ3JIntev3g4-Y',
            q:'music',
            type:'video',
            maxResults:'4',
            part: 'snippet'
        },
        headers: {
        },
        json: true // Automatically parses the JSON string in the response
    }
    rp(options)
        .then(function (repos) {
            //console.log('User has %d repos', repos);
            
            res.status(200).json([{message:'this dashborad api page'},repos]);
        })
        .catch(function (err) {
            // API call failed...
            console.log(err +'      ssd')
        })
})

module.exports = router;