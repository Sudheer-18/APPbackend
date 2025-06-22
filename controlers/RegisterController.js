const express = require("express")
const mydb = require("../Model/RegisterModel.js")
const mongoose = require('mongoose');

const RegisterData = (req,res) => {
    const ob = req.body;
    mydb.insertMany(ob)
    .then(result=>{
        return res.status(200).json("record added");
    })
    .catch(err=>{
        return res.status(500).json(err);
    })
} 


exports.RegisterData = RegisterData;