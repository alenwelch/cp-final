const express = require('express')
const bodyparser = require("body-parser");

const nodemailer = require('nodemailer');
const app = express();


app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended: true}));


app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.get("/contact",function(req, res){
    res.sendFile(__dirname + "/contact-us.html");
});
 app.post("/contact",function(req, res){

        const comm = req.body.message;
        const na = req.body.nameofperson;
        const contactnumber = req.body.number;
        const addressofuser = req.body.address;
       
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cpservices1505@gmail.com',
          pass: 'yvcfuvgywspdsplz'
        }
      });

      var mailOptions = {
        from: 'cpservices1505@gmail.com',
        to: req.body.username,
        cc: 'cpservices1505@gmail.com',
        subject: 'Thanks for chosing our service ' + na,
        text: '',  
        html: "<p>We will contact you as soon as possible</p>" + "<h2>details</h2>" + "<p><h3>Your name</h3></p>" + na + "<p><h3>Your contact number</h3></p>" + contactnumber + "<p><h3>Your Address</h3></p>" + addressofuser + "<p><h3>Your Message</h3></p>" + comm,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.redirect('/');
          console.log('Email sent: ' + info.response);
        }
      });
      
      
    });
  

app.listen(3000, function() {
    console.log("server started");
});
