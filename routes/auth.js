const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// get loggedin user
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        return res.json(user)
    } catch (error) {
        return res.status(500).json({msg: 'server error'})
    }
})

// authenticate user
router.post('/', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({msg: 'email not found'})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({msg: 'password is invalid'})
    }
    const payload = {
        user: {
            id: user.id
        }
    }
    jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
    }, (err, token) => {
        if(err) return res.status(500).json({msg: 'server error'})
        return res.json({token})
    })
})

module.exports = router