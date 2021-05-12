const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// const User = require('../models/user')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const  keys  = require('../keys')
const requireLogin = require("../middleware/requireLogin")

router.get("/", (req, res) => {
    res.send("routes")
})

router.get("/signup", (req, res) => {
    res.send("signup")
})

router.get("/signin", (req, res) => {
    res.send("signin route is here")
})

router.get("/protected", requireLogin, (req, res) => {
    res.send("welcome user")
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({ _id: savedUser._id }, keys.JWT_SECRET)
                res.json({ token })
                
            //    const {_id,name,email,followers,following,pic} = savedUser
            //    res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post("/signup", (req, res) => {
    const {name, email, password}= req.body
    if (!name || !email || !password) {
        return res.status(422).json({error:"Please add all the fields"})
    }
    User.collection.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
        return res.status(422).json({error:"user already exists"})
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password:hashedpassword,
                        name
                    })
                    user.save()
                        .then(user => {
                        res.json({ message: "saved sucessfully" })
                    }).catch(err => {
                            console.log(err);
                        })
            })
        }).catch(err => {
            console.log(err);
        })
})

module.exports= router