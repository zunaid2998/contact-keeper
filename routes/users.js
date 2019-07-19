const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

const validation = [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Email needs to be a valid email').isEmail(),
    check('password', 'Password needs to be minimum of 6 characters long').isLength({min: 6})
]

// register a user 
router.post('/', validation, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({msg: 'user already exists'})
        }
        user = new User({name, email, password})

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        res.send('User saved')

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({msg: 'server error'})
    }
})

module.exports = router