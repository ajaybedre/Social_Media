const express = require('express');
const Sequelize = require('sequelize');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var bodyParser = require('body-parser');

const { table } = require('console');
const http = require('http');
const mysql = require('mysql');
var connection = require('./app_sql');
//var indexRouter = require('./Index.html');
var request = require('./routes/Request');
//var pending= require('./routes/Show_Pending');
const { title } = require('process');
var app = express();

const port = 3080; //Changed port to 3080 from 3000
//register view engine
app.set('view engine', 'ejs');

//get path
const staticpath = path.join(__dirname, "../public");
console.log(staticpath);
//const staticbook = path.join(_)
//listen for req

app.listen(port, () => {
    console.log(`listening to server at port : ${port}`)
});

app.use(express.static(staticpath));

///AUTHENTICATION CODE HERE
//require data base models
app.use(express.json());
app.use(express.urlencoded({extended:false})); //not needed
app.use(cookieParser());
require('./models/index');

//use express routes
app.use('/Log',require('./routes'));

app.get('/', (req, res) => {
    res.sendFile(staticpath + '/Friend_Request.html');
});

app.get('/Logging', (req,res)=>{
  res.sendFile(staticpath + '/Login.html');
});
///ENDS HERE
// app.get('/hi', (req, res) => {
//     res.redirect('/demo');
// });

// app.use((req, res) => {
//     res.status(404).send('<h1>404 Error</h1>');
// });

/*app.get('/',(req,res) => {
    res.sendFile('./Index.html',{root:__dirname});
});*/

app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.get('/Posting', function(req,res){
  var g = require("./auth");
  var a1 = req.query.Username;
  var a2 = req.query.req;
  a1=g.g;
})

app.get('/Viewpost', function(req,res){
  var g = require("./auth");
  var a1 = req.query.Username;
  var a2 = req.query.req;
  a1=g.g;
  
})

app.get('/Register', function(req,res){
  res.sendFile(staticpath + '/Registration.html');
})

app.use(express.static(path.join(__dirname,'public')));
app.get('/req',function(req, res){
  var g = require("./auth");
  var a1 = req.query.Username;
  var a2 = req.query.req;
  //var g = a1;
  //a2 = 'Ajay';
  console.log(g.g, a1, a2);
  a1=g.g;
  if(a1==a2)
  {
      res.render("Selfreq");
  }
  var find = "SELECT username FROM userstable WHERE username =?";
  connection.query(find,[a2],function(err,rows)  {
    if(err){
      //req.flash('error', err); 
      res.render('Nouserfound',{page_title:"",data:''});   
     }else{
        
         console.log('Data recieved from usertable Database is: \n ');
          rows.forEach((row)=>{
              console.log("username ", row.username);
          });
          console.log("\n-----------\n");
          
          if(rows.length > 0)
          {
            let g = req.query.req;
            let q2 = "SELECT Friend_ID FROM friend_list WHERE User_ID = ?";
            connection.query(q2,[g],function(err, rows){
              if(err){
                //console.log("ANNIE ARE YOU WOKAY?");
                //req.flash('error', err); 
                res.render('Nouserfound',{page_title:"",data:''});  
                var k = 0; 
               }else{
                 //console.log(rows.Friend_ID, a1);
                 rows.forEach((row)=>{
                  console.log("Friend", row.Friend_ID);
                  if(row.Friend_ID == a1)
                  {
                    k=1;
                  }
                 });
                 if(k==1)
                 {
                   res.render('Alreadyfriend',{page_title:"",data:rows});
                 }
                 else
                 {
                  
                  //var w = "INSERT INTO pending_requests (Sender, Reciever) VALUES ("+a1+","+a2+")";
                  var w = "INSERT INTO pending_requests (Sender, Reciever) VALUES (?,?)";
                  connection.query(w,[a1,a2],(err,results)=>{
                    if(err) 
                    {
                      //console.log("YOU'VE BEEN HIT BY A SMOOTH CRIMINAL!");
                      res.render('Alreadyrequestsent');
                      //throw err;
                    }
                    else
                    {
                    console.log("VALUES INSERTED!\n");
                    res.render('Requested');
                    }
                    //res.redirect('/');
                  });
                  //alert("")
                 }
               }

            })
            
          }
          else
          {
            res.render('Nouserfound',{page_title:"",data:''});
            //res.render('Pending',{page_title:"Your pending requests",data:rows});
          }
         
     }
  });
});
//app.use('/pending',pending);

/*app.use(function(req, res, next) {
    next(createError(404));
  });  
 
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
    res.status(err.status || 500);
    res.render('error');
  });*/

  app.get('/sent', function(req, res) {
    var g = require("./auth");
      var a1 = req.query.Username;
      a1=g.g;
      var a2 = req.query.req;
      console.log(a1, a2);
      var sqlq = "SELECT * FROM pending_requests WHERE Sender=?";
      connection.query(sqlq,[a1],function(err,rows)     {
      
             if(err){
              //req.flash('error', err); 
              res.render('Sentreq',{page_title:"Your sent requests are",data:''});   
             }else{
                
                 console.log('Data recieved from Pending Database is: \n ');
                  rows.forEach((row)=>{
                      console.log("Sender: ", row.Sender, " Reciever: ", row.Reciever);
                  
                  });
                  console.log("\n-----------\n");
                 res.render('Sentreq',{page_title:"Your sent requests are",data:rows});
             }
                                 
              });
             
         });


app.get('/pending', function(req, res) {
  var g = require("./auth");
    var a1 = req.query.Username;
    a1=g.g;
    var a2 = req.query.req;
    console.log(a1, a2);
    var sqlq = "SELECT * FROM pending_requests WHERE Reciever=?";
    connection.query(sqlq,[a1],function(err,rows)     {
    
           if(err){
            //req.flash('error', err); 
            res.render('Pending',{page_title:"Your pending requests",data:''});   
           }else{
              
               console.log('Data recieved from Pending Database is: \n ');
                rows.forEach((row)=>{
                    console.log("Sender: ", row.Sender, " Reciever: ", row.Reciever);
                
                });
                console.log("\n-----------\n");
               res.render('Pending',{page_title:"Your pending requests",data:rows});
           }
                               
            });
           
       });
app.get('/Friend', function(req,res){
    var a1 = req.query.Username;
    var a2 = req.query.req;
    var g = require("./auth");
    a1=g.g;
    console.log(a1, a2);
    var sqlq = "SELECT * FROM friend_list WHERE User_ID=?";
    connection.query(sqlq,[a1],function(err,rows)     {
    
           if(err){
            //req.flash('error', err); 
            res.render('Friends',{page_title:"Your pending requests",data:''});   
           }else{
               console.log("\n-----------\n");
               res.render('Friends',{page_title:"Your friend list!",data:rows});
           }
                               
            });
});
app.get('/Unfriend', function(req,res){
  var a1 = req.query.User;
  var a2 = req.query.frnd;
  console.log(a1, a2);
  var sq = "DELETE FROM friend_list WHERE User_ID=? AND Friend_ID=?";
  connection.query(sq,[a1,a2], function(err,rows){
    if(err){
      throw err;
    }else
    {
      console.log('UNFRIENDED!');
      //alert("Successfully unfriended " + a2);
    }
    //res.render('/Unfriended');
  });
  var sq = "DELETE FROM friend_list WHERE User_ID=? AND Friend_ID=?";
  connection.query(sq,[a2,a1], function(err,rows){
    if(err){
      throw err;
    }else
    {
      console.log('UNFRIENDED!');
      //alert("Successfully unfriended " + a2);
    }
    
  });
  res.render('Unfriended');
  
});
app.get('/Accept', function(req, res){
  var a1 = req.query.Username;
  var a2 = req.query.req;
  var g = require("./auth");
  //a2=g.g;
  var w = "INSERT INTO friend_list (User_ID, Friend_ID) VALUES (?,?)";
  connection.query(w,[a1,a2],(err,results)=>{
    if(err) 
    {
      //console.log("YOU'VE BEEN HIT BY A SMOOTH CRIMINAL!");
      throw err;
    }
    else
    {
    console.log("VALUES INSERTED!\n");
    //res.render('Requested');
    }
  });
  connection.query(w,[a2,a1],(err,results)=>{
    if(err) 
    {
      //console.log("YOU'VE BEEN HIT BY A SMOOTH CRIMINAL!");
      throw err;
    }
    else
    {
    console.log("VALUES INSERTED 2!\n");
    //res.render('Requested');
    }
  });
  w = "DELETE FROM pending_requests WHERE Sender=? AND Reciever = ?";
  connection.query(w,[a2,a1],(err,results)=>{
    if(err) 
    {
      //console.log("YOU'VE BEEN HIT BY A SMOOTH CRIMINAL!");
      throw err;
    }
    else
    {
    console.log("VALUES DELETED!\n");
    //res.render('Requested');
    }
  });
  w = "DELETE FROM pending_requests WHERE Sender=? AND Reciever = ?";
  connection.query(w,[a1,a2],(err,results)=>{
    if(err) 
    {
      //console.log("YOU'VE BEEN HIT BY A SMOOTH CRIMINAL!");
      throw err;
    }
    else
    {
    console.log("VALUES DELETED 2!\n");
    //res.render('Requested');
    }
  });  
  res.redirect('/');
});

app.get('/Decline', function(req, res){
  var a1 = req.query.Username;
  var a2 = req.query.req;
  var g = require("./auth");
  console.log(g,a1,a2);
  w = "DELETE FROM pending_requests WHERE Sender=? AND Reciever = ?";
  connection.query(w,[a2,a1],(err,results)=>{
    if(err) 
    {
      //console.log("YOU'VE BEEN HIT BY A SMOOTH CRIMINAL!");
      throw err;
    }
    else
    {
    console.log("VALUES DELETED!\n");
    //res.render('Requested');
    }
  });
  w = "DELETE FROM pending_requests WHERE Sender=? AND Reciever = ?";
  connection.query(w,[a1,a2],(err,results)=>{
    if(err) 
    {
      //console.log("YOU'VE BEEN HIT BY A SMOOTH CRIMINAL!");
      throw err;
    }
    else
    {
    console.log("VALUES DELETED 2!\n");
    //res.render('Requested');
    }
  }); 
  res.redirect('/');
});

app.get('/callback', function(req, res){
  var a1 = req.query.Username;
  var a2 = req.query.req;
  var g = require("./auth");
  console.log(g,a1,a2);
  w = "DELETE FROM pending_requests WHERE Sender=? AND Reciever = ?";
  connection.query(w,[a2,a1],(err,results)=>{
    if(err) 
    {
      //console.log("YOU'VE BEEN HIT BY A SMOOTH CRIMINAL!");
      throw err;
    }
    else
    {
    console.log("VALUES DELETED!\n");
    //res.render('Requested');
    }
  });
  w = "DELETE FROM pending_requests WHERE Sender=? AND Reciever = ?";
  connection.query(w,[a1,a2],(err,results)=>{
    if(err) 
    {
      //console.log("YOU'VE BEEN HIT BY A SMOOTH CRIMINAL!");
      throw err;
    }
    else
    {
    console.log("VALUES DELETED 2!\n");
    //res.render('Requested');
    }
  }); 
  res.redirect('/');
});
//404 PAGE
app.use((req,res) => {
    res.status(404).sendFile('./404.html',{root:__dirname});
});

module.exports = app;