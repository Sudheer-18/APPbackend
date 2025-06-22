const express = require('express')
const mongoose = require('mongoose')

const ProfileData = new mongoose.Schema({
    fullname : {
        type: String
    },
    email: {
        type : String
    },
    phonenumber : {
        type : Number
    },
    country : {
        type : String
    },
    Experience : {
        type : Number
    },
    Stream : {
        type : String
    },
    Skills : {
        type: String
    },
    About : {
        type : String
    }
})


module.exports = mongoose.model("ProfileData",ProfileData);