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


const getprofiledata = async(req,res) => {
     try {
      const users = await mydb.find(req.body); 
      console.log(users); 
      res.json(users);   
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };

exports.getprofiledata = getprofiledata;
exports.ProfileData = ProfileData;