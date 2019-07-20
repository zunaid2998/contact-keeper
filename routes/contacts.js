const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const Contact = require('../models/Contact')
const User = require('../models/User')

// get all user's contacts
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find( {user: req.user.id}).sort({date: -1})
        res.json(contacts)
    } catch (error) {
        res.status(500).json({msg: 'server error'})
    }
})

// add a new contact
router.post('/', auth, async (req, res) => {
    const {name, email, phone, type} = req.body
    try {
        const contact = await Contact.create({name, email, phone, type, user: req.user.id})
        res.json(contact)
    } catch (error) {
        res.status(500).json({msg: 'server error'})
    }
})

// update a new contact
router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;
    const contactFields = {}
    if(name) contactFields.name = name
    if(email) contactFields.email = email
    if(phone) contactFields.phone = phone
    if(type) contactFields.type = type
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) 
            return res.status(400).json({msg: 'contact not found'});
        if(contact.user.toString() !== req.user.id) 
            return res.status(401).json({msg: 'not authorized'});
        
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id, 
            {$set: contactFields}, 
            {new: true})
        res.json(updatedContact)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete contact
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id)
        if(!contact) res.status(400).json({msg: 'contact not found'})
        if(contact.user.toString() !== req.user.id) res.status(401).json({msg: 'user not authorized'})
        await Contact.findByIdAndDelete(req.params.id)
        res.json({msg: 'contact deleted'})
    } catch (error) {
        res.json(error)
    }
    
})

module.exports = router