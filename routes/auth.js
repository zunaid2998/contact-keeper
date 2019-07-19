const express = require('express')
const router = express.Router()

// get loggedin user
router.get('/', (req, res) => {
    res.send('get logged in user')
})

// authenticate user
router.post('/', (req, res) => {
    res.send('Authenticate user')
})

module.exports = router