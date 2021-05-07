const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new  Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // name: {
    //     type: String,
    //     required: true
    // }
})


module.exports= User = mongoose.model("User", userSchema)