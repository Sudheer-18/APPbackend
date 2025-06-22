const express = require('express');
const mydb = require('../Model/ProfileModel')
const mongoose = require('mongoose')


const ProfileData = (req,res) => {
    const ob = req.body;
    mydb.insertMany(ob)
   .then(result=>{
        return res.status(200).json("record added");
    })
    .catch(err=>{
        return res.status(500).json(err);
    })
}


exports.ProfileData = ProfileData;