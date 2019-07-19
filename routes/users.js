const express = require('express')
const router = express.Router()

// register a user
router.post('/', (req, res) => {
    res.send('Add a new user')
})

module.exports = router