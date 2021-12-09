const { Router } = require('express');
var express = require('express');
var router = express.Router();
var connection  = require('../app_sql');
//const { to } = require('./book');
var del = require('../../Try_B');

//function openFormid()
{
  // var from = document.getElementById('from').value;
  //  var to = document.getElementById('to').value;
   // alert("Recieved From: " + from + " to: " + to);
}

router.get('/', function(req, res, next) {
    var sqlq = "SELECT * FROM travelpoint WHERE To = ? AND From = ?";
    connection.query(sqlq,[del.to,del.from],function(err,rows)     {
    
           if(err){
            //req.flash('error', err); 
            res.render('Flights',{page_title:"FLIGHTS DATA",data:''});   
           }else{
               
               res.render('Flights',{page_title:"FLIGHTS DATA",data:rows});
           }
                               
            });
           
       });
   
       module.exports = router;