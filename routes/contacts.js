const express = require('express')
const router = express.Router()

// get all contacts
router.get('/', (req, res) => {
    res.send('get all contacts')
})

// add a new contact
router.post('/', (req, res) => {
    res.send('Add a new contact')
})

// update a new contact
router.put('/:id', (req, res) => {
    res.send('update a contact')
})

// delete contact
router.delete('/:id', (req, res) => {
    res.send('delete a contact')
})

module.exports = router