const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Users = require('../models/user');
const multer = require('multer');
const nodemailer = require('nodemailer');
const store = multer.diskStorage({
 
    destination: function(req, file, cb){
      cb(null, './uploads');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now()+'.'+file.originalname);
    }
});


const fileFilter = (req,file,cb) => {
  //reject a file
   if(file.mimetype === 'application/octet-stream'){
    cb(null,false);
    
   }else{
    cb(null,true);
   }
  
  }

var upload = multer({storage: store, limits:{fileSize:1024 * 1024 * 25},fileFilter:fileFilter}).single('file');







const db = "mongodb://userashu:09091998ashu@ds163013.mlab.com:63013/usersprofile"
// mongoose.Promise = global.Promise;

mongoose.connect(db,{useNewUrlParser:true},function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});


router.post('/upload', (req,res,next)=>{


  upload(req,res,function(err){
    if(err){
      return res.status(501).json({error:err});
    }else{

      Users.findByIdAndUpdate(req.headers.authorization, { "data.doc.link":req.file.originalname },
      {new: true},
       function(err, result) {
         if(err){
             res.send(err);
          }else{
            res.send(result);
         }
  
      })

    }

     
      })
});

router.post('/getfiles',(req,res) => {

   Users.findOne({_id:req.body.id}, (err,user) => {

    if(err){
      res.send(err);
    }else{
      res.send(user);
    }

   })

})



router.post('/formdetails', (req,res) => {
 
     Users.findOne({_id:req.body.id}, (err, user) => {

      if(err){
        res.send(err);
      }else{
        res.send(user.data.details);
      }

     })
 


})





router.post('/login', (req, res) => {
    let userData = req.body
    Users.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    })
  })


  router.post('/register', (req, res) => {
    
  const user = new Users({

    _id:new mongoose.Types.ObjectId,
    email:req.body.email,
    password:req.body.password,
    name:req.body.name

  })

    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
  })



router.post('/sendMail', (req,res) => {

  const output =`
  <p>you have a new message</p>
     <h3>
      <ul>
       <li>Name:${req.body.name}</li>
       <li>Email:${req.body.email}</li>
       <li>Phone:${req.body.phone}</li>
      </ul>
     </h3>
 `;
// var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
   user: 'ashutoshsenger09@gmail.com',
   pass: '09091998ashutosh'
 }
});

var mailOptions = {
 from: 'ashutoshsenger09@gmail.com',
 to: 'ashutoshsenger09@gmail,careernaksha1@gmail.com',
 cc: 'nimish@careernaksha.com',
 subject: 'You have a new user',
 text: 'A new user just created his account on CareerNaksha.com',
 html: output
};

transporter.sendMail(mailOptions, function(error, info){
 if (error){
   console.log(error);
 } else {
    // res.render('contact',{msg:'Email has been sent!!'});
    console.log(info);
 }
});
  
})




router.post('/sendContact', (req,res) => {

  const output =`
  <p>you have a new Contact Form </p>
     <h3>
      <ul>
       <li>Email:${req.body.email}</li>
       <li>Phone:${req.body.phone}</li>
       <li>Message:${req.body.message}</li>
      </ul>
     </h3>
 `;
// var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
   user: 'careernaksha1@gmail.com',
   pass: 'Careernaksha123'
 }
});

var mailOptions = {
 from: 'careernaksha1@gmail.com',
 to: 'ashutoshsenger09@gmail.com,careernaksha1@gmail.com,ashutoshsenger0909@gmail.com',
 cc: 'nimish@careernaksha.com',
 subject: 'CareerNaksha | You have a new Contact form',
 text: 'A new user just created his account on CareerNaksha.com',
 html: output
};


transporter.sendMail(mailOptions, function(error, info){
 if (error){
   console.log(error);
 } else {
    // res.render('contact',{msg:'Email has been sent!!'});
    console.log(info);
 }
});
  
})














router.post('/updateuser/basic',(req,res) => {
  
        
    Users.findByIdAndUpdate(req.body.id, { 'data.details.basic': {

        name:req.body.name,
        email:req.body.email,
        dob:req.body.dob,
        phone:req.body.phone


    } },
        {new: true},
         function(err, result) {
           if(err){
               res.send(err);
            }else{
              res.send(result);
           }

        })
})

router.post('/updateuser/personal',(req,res) => {
  
        
  Users.findByIdAndUpdate(req.body.id, { 'data.details.personal': {

    gender:req.body.gender,
    marital:req.body.marital,
    familymembers:req.body.familymembers,
    familyincome:req.body.familyincome,
    occupation:req.body.occupation,
    individualincome:req.body.individualincome,
    facebook:req.body.facebook,
    linkedin:req.body.linkedin,
    twitter:req.body.twitter,
    address:req.body.address,
    skills:req.body.skills,
    eca:req.body.eca,
    higheduqual:req.body.higheduqual


} },
      {new: true},
       function(err, result) {
         if(err){
             res.send(err);
          }else{
            res.send(result);
         }

      })
})



router.post('/updateuser/educational',(req,res) => {
  
        
  Users.findByIdAndUpdate(req.body.id, { 'data.details.educational': {

    highschool:req.body.highschool,
    college:req.body.college,
    bfield:req.body.bfield,
    buniversity:req.body.buniversity,
    mfield:req.body.mfield,
    muniversity:req.body.muniversity,
    toeflscore:req.body.toeflscore,
    grescore:req.body.grescore,
    gmatscore:req.body.gmatscore,
    ieltsscore:req.body.ieltsscore,
    additionalqual:req.body.additionalqual


} },
      {new: true},
       function(err, result) {
         if(err){
             res.send(err);
          }else{
            res.send(result);
         }

      })
})



router.post('/updateuser/professional',(req,res) => {
  
        
  Users.findByIdAndUpdate(req.body.id, { 'data.details.professional': {

    onerole:req.body.onerole,
    onelocation:req.body.onelocation,
    onesalary:req.body.onesalary,
    tworole:req.body.tworole,
    twolocation:req.body.twolocation,
    twosalary:req.body.twosalary


} },
      {new: true},
       function(err, result) {
         if(err){
             res.send(err);
          }else{
            res.send(result);
         }

      })
})




router.post('/updateuser/interest',(req,res) => {
  
        
  Users.findByIdAndUpdate(req.body.id, { 'data.details.interest': {

nextmove:req.body.nextmove,
fieldofinterest:req.body.fieldofinterest,
joblocation:req.body.joblocation,
jobtype:req.body.jobtype,
desiredsalary:req.body.desiredsalary,
desiredlivingexp:req.body.desiredlivingexp,
desirefive:req.body.desirefive,
desireten:req.body.desireten,
onegoal:req.body.onegoal,
twogoal:req.body.twogoal


} },
      {new: true},
       function(err, result) {
         if(err){
             res.send(err);
          }else{
            res.send(result);
         }

      })
})






router.post('/updateuser/lifestyle',(req,res) => {
  
        
  Users.findByIdAndUpdate(req.body.id, { 'data.details.lifestyle': {

entertainment:req.body.entertainment,
living:req.body.living,
food:req.body.food,
travel:req.body.travel,
electronics:req.body.electronics,
misc:req.body.misc
    
    
    } },
      {new: true},
       function(err, result) {
         if(err){
             res.send(err);
          }else{
            res.send(result);
         }

      })
})



router.post('/getuserinfo',(req,res)=>{

   Users.findById(req.body.id,(err,result)=>{
     if(err){
       res.send(err);
     }else{
       res.send(result);
       
     }
   })


})











module.exports = router;