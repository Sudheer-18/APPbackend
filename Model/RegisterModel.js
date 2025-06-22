const express = require('express');
const mongoose = require('mongoose');

const RegisterData = new mongoose.Schema({
    FullName : {
        type : String
    },
    Email : {
        type : String
    },
    Password : {
        type : String
    }
})


module.exports = mongoose.model("RegisterData",RegisterData);