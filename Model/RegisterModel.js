const express = require('express');
const mongoose = require('mongoose');

const RegisterData = new mongoose.Schema({
    fullName : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
})


module.exports = mongoose.model("RegisterData",RegisterData);