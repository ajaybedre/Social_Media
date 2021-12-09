

const jwt = require('jsonwebtoken');
const db= require('./models/index');
var nodemailer = require('nodemailer');
const { SELECT } = require('sequelize/dist/lib/query-types');
var connection = require('./app_sql');
const { request } = require('express');
const { readSync } = require('fs');
const User = db.User;
var path = require('path');
const staticpath = path.join(__dirname, "../public");
console.log(staticpath);
//creating new user

module.exports.create = async (req,res)=>{
    try{
        console.log(req.body);
        var {username,password,email,contactNo,firstName,midName,lastName}=req.body;
        console.log(username,password,email,contactNo,firstName,midName,lastName);
        /*
        CREATE TRIGGER
        //THIS CODE WORKS BUT ALSO REQUIRES CONTACTS
        var username=req.body.username;
        var password=req.body.password;
        var email=req.body.en;
        var contactNo=req.body.cn;
        var firstName=req.body.fn;
        var midName=req.body.mn;
        var lastName=req.body.ln;
        var f="INSERT INTO `userstable` (`username`,`password`,`email`,`firstName`,`midName`,`LastName`,`contactNo`) VALUES (?,?,?,?,?,?,?)";
        connection.query(f,[username,password,email,firstName,midName,LastName,contactNo],function(err,rows){
            if(err){
             //req.flash('error', err); 
             throw err;
             //res.render('Pending',{page_title:"Your pending requests",data:''});   
            }else{
                if(rows.length>0)
                {
                    console.log("Login Successful!");
                    console.log("\n-----------\n");
                    res.redirect('/');
                }
                else
                {
                console.log("No such user found!");
                 console.log("\n-----------\n");
                 res.render('Nouserfound');
                }
                //res.render('Pending',{page_title:"Your pending requests",data:rows});
            }
                                
             });*/
        //THIS CODE WORKS BUT ALSO REQUIRES CONTACTS
        const user = await User.create({
            username:req.body.username,
            password:req.body.password,
            email:req.body.en,
            contactNo:req.body.cn,
            firstName:req.body.fn,
            midName:req.body.mn,
            lastName:req.body.ln
        });
        console.log(user);
        res.render('SuccessReg');
        //return res.sendStatus(200);

    }catch(err){
       console.error(`Error in creating user: ${err}`);
       return res.sendStatus(403);
    }
}


//user login

module.exports.login = async (req,res)=>{
    
    //D:\Desktop\Social_Media\src\Login.Html
    try{
        
        //password - confirm password check at client side
        const user = await User.findOne({where:{username:req.query.username}});
        if(user){
           /*if(user.verifyPassword(req.body.password)){
               const token = jwt.sign({username:user.username,_id:user.id},process.env.jwtSecret);
               res.cookie('accessToken',token);
               return res.sendStatus(200);
           }else{
               console.log("hh")
               return res.sendStatus(400);
           }*/
           var g = req.query.username;
           var p = req.query.password;
           /*module.exports.ggg = (g)=>{
               return g
           }
           */
           module.exports = {g};
           var qu = "SELECT * FROM userstable WHERE username=? AND password=?";
           //console.log("hehehe" + g);
           connection.query(qu,[g,p],function(err,rows){
            if(err){
             //req.flash('error', err); 
             throw err;
             //res.render('Pending',{page_title:"Your pending requests",data:''});   
            }else{
                if(rows.length>0)
                {
                    console.log("Login Successful!");
                    console.log("\n-----------\n");
                    res.redirect('/');
                }
                else
                {
                console.log("No such user found!");
                 console.log("\n-----------\n");
                 res.render('Nouserfound');
                }
                //res.render('Pending',{page_title:"Your pending requests",data:rows});
            }
                                
             });
        }else{
            console.log("hhh")
            return res.sendStatus(401);
        }
    }catch(err){
        console.error(`Error in logging  user: ${err}`);
        return res.sendStatus(403);
    }
}

//authentication middleware

module.exports.isAuthenticated = async(req,res,next)=>{
    try{
        const token =req.cookies.accessToken;
        await jwt.verify(token,process.env.jwtSecret,(err,user)=>{
            if(err){
                return res.sendStatus(404);
            }
            req.user =user;
            next();
        })
       
    }catch(err){

        console.error(`Error in isAuthenticated middleware: ${err}`);
        return res.sendStatus(403);

    }
}

// changing/updating password

module.exports.updatePassword =async (req,res)=>{
    try{
        console.log(req.user.username);
        console.log(req.body);
        const user = await User.findOne({where:{username:req.user.username}});
        if(user){
            if(user.verifyPassword(req.body.password)){
                await User.update({ password: req.body.newPassword }, {
                    where: {
                      username: req.user.username
                    }
                  });
                  res.sendStatus(200);
            }else{
                return res.sendStatus(403);
            }
        }else{
            return res.sendStatus(404);
        }
        
    }catch(err){
        console.error(`Error in updating  password: ${err}`);
        return res.sendStatus(403);
    }
}
//function to send mail
const sendEmail =async(userEmail,link)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'akash.me23@gmail.com',
          pass: 'xwjfmrdpgvtufrsx'
        }
      });
      
      var mailOptions = {
        from: process.env.mailId,
        to: userEmail,
        subject: 'Password reset mail from Social',
        text:  `Please click the link below to reset your password.
        The link will be valid for 15 minutes.

        ${link}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        //   console.error(`Error in sending Email: ${error}`);
          return false;
        } else {
        //   console.log('Email sent: ' + info);
          return true;
        }
      });
}
//generate link and send on mail

module.exports.forgotPassword =async (req,res)=>{
    try{
        
       const email =req.body.email;
       console.log(email);
       const user = await User.findOne({where:{email:email}});

       const token = jwt.sign({username:user.username,_id:user.id},process.env.jwtSecret+user.password,{expiresIn:'15m'});
       const link = `http://localhost:3080/auth/${user.username}/${token}`;
       console.log(link);
       const result=sendEmail(user.email,link);
       if(result){
           return res.sendStatus(200);
       }else{
           return res.sendStatus(400);
       }
       
    }catch(err){
        console.error(`Error in forgotPassword middleware: ${err}`);
        return res.sendStatus(403);
    }
}

//render to proper page //get
module.exports.resetPassword =async (req,res)=>{
    try{
        const {id,token}=req.params;

        const user = await User.findOne({where:{id:id}});
        await jwt.verify(token,process.env.jwtSecret+user.password);
        //render some view with user etails
        res.sendStatus(200);//temp
    }catch(err){
        console.error(`Error in resetPassword middleware: ${err}`);
        return res.sendStatus(403);
    }
}

//handle password updates //post

module.exports.updateNewPassword =async (req,res)=>{
    try{
        //check password and confirm password
        //accept newpassword
        const {id,token}=req.params;
        const user = await User.findOne({where:{username:id}});
        await jwt.verify(token,process.env.jwtSecret+user.password);
        await User.update({ password: req.body.newPassword }, {
            where: {
              username: user.username
            }
        });
        //temp
        return res.sendStatus(200);
    }catch(err){
        console.error(`Error in resetPassword middleware: ${err}`);
        return res.sendStatus(403);
    }
}