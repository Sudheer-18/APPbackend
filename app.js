require('dotenv').config(); 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const Routes = require("./roters/router2")
const roters = require("./roters/eminiroute")
const cors= require("cors")
const bodypasrer = require("body-parser")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer");


console.log(process.env.GEMINI_API_KEY)


var app = express();

mongoose.connect("mongodb+srv://kosireddysudheer803:pMImhxbsZ4QqAYDH@cluster0.stqqg.mongodb.net/")
// mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.0")
.then(result => {
  console.log("Connected")
})
.catch(err => {
  console.log(err)
})


// const port = 5500;
const handlePort = () =>{
  console.log('Port work avthundhi ra')
}
app.use(cors())  
app.use(bodypasrer.json());

app.use("/api",roters);


// app.get("/testing",function(req,res){
//   res.send("<h1>Hi</h1>")
// })

app.listen(5001, handlePort);   

// app.listen(5001, "0.0.0.0", () => {
//   console.log(`Server running on http://0.0.0.0:3000`);
// });


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
