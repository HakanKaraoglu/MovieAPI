var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();

//Models
const Director=require('../models/Director');

//Get all Director
router.get('/', (req, res, next) => {
    const promise=Director.aggregate([
        {
            $lookup: {
                from:'movies',
                localField:'_id',
                foreignField:'directorId',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movies:'$movies'
            }
        }
    ]);
        
    promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      });    
});

//Get Director by Id
router.get('/:director_id', (req, res, next) => {
    
    const promise=Director.aggregate([
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from:'movies',
                localField:'_id',
                foreignField:'directorId',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movies:'$movies'
            }
        }
    ]);
  
    promise.then((data)=>{
      if(!data)
        next({message:'The Director was not found',code:404});
      res.json(data)
    }).catch((err)=>{
      res.json(err);
    });
  });

//Create new Director
router.post('/',(req,res,next)=>{  
    const movie=new Director(req.body);
    const promise=movie.save();
    promise.then((data) => {
      res.json({status:1});
    }).catch((err) => {
      res.json(err);
    });
  });

//Update a Director
router.put('/:director_id', (req, res, next) => {
    const promise=Director.findOneAndUpdate(
      req.params.director_id,
      req.body,
      {
        new:true
      }
      );
  
    promise.then((data)=>{
      if(!data)
        next({message:'The Director was not found',code:404});
      res.json(data)
    }).catch((err)=>{
      res.json(err);
    });
  });


//Delete Director by Id
router.delete('/:director_id', (req, res, next) => {
    const promise=Director.findByIdAndRemove(req.params.director_id);
  
    promise.then((data)=>{
      if(!data)
        next({message:'The Director was not found',code:404});
      res.json({status:1})
    }).catch((err)=>{
      res.json(err);
    });
  });


module.exports = router; 