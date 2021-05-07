const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')

mongoose.model('User')

router.get("/", (req, res) => {
    res.send("routes")
})
router.get("/signup", (req, res) => {
    res.send("signup")
})

router.post("/signup", (req, res) => {
    const {name, email, password}= req.body
    console.log(req.body);
    if (!name || !email || !password) {
        return res.status(422).json({error:"Please add all the fields"})
    }
    User.collection.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
        return res.status(422).json({error:"user already exists"})
            }
            const user = new User({
                email, password, name
            })
            user.save()
                .then(user => {
                res.json({ message: " saved sucessfully" })
            }).catch(err => {
                    console.log(err);
                })
        }).catch(err => {
            console.log(err);
        })
})

module.exports= router