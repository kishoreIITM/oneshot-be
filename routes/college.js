var express = require('express');
var router = express.Router();
const colleges = require('../models/college');
const students = require('../models/students');


router.route('/:id')
.get((req,res,next)=>{
  colleges.findOne({id:req.params.id})
  .then(college=>{
    students.find({college:college.name})
    .then(students=>{

        colleges.find({state:college.state})
        .then((simstate)=>{
            
            if (simstate.length == 1){
              colleges.find({students:{$lte: college.students+50, $gte:college.students-50}})
              .then(simstud=>{
                if (simstud.lenght==1){
                  simstud=[]
                }
                console.log("hi")
                res.json({college:college,students:students,simcollege:simstud})
              },err=>{
                console.log(err)
              })
            }
            else{

              res.json({college:college,students:students,simcollege:simstate})
            }
            
        })
    })
    
  })
})

module.exports = router;