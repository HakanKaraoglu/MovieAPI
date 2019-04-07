var express = require('express');
var router = express.Router();

//Models
const Movie=require('../models/Movie');

//Get all movies
router.get('/', (req, res, next) => {
    const promise=Movie.aggregate([
      {
        $lookup:{
          from:'directors',
          localField:'directorId',
          foreignField:'_id',
          as:'director'
        }
      },
      {
        $unwind:'$director'
      }
    ]);
    promise.then((data)=>{
      res.json(data)
    }).catch((err)=>{
      res.json(err);
    });
});

//Top 10 List Movies
router.get('/top10', (req, res, next) => {
  const promise=Movie.find({}).limit(10).sort({imdbScore:-1});
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err);
  });
});

//Get movie by Id
router.get('/:movie_id', (req, res, next) => {
  const promise=Movie.findById(req.params.movie_id);

  promise.then((data)=>{
    if(!data)
      next({message:'The Movie was not found',code:404});
    res.json(data)
  }).catch((err)=>{
    res.json(err);
  });
});

//Create new movie
router.post('/',(req,res,next)=>{  
  const movie=new Movie(req.body);
  const promise=movie.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//Update a movie
router.put('/:movie_id', (req, res, next) => {
  const promise=Movie.findOneAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new:true
    }
    );

  promise.then((data)=>{
    if(!data)
      next({message:'The Movie was not found',code:404});
    res.json(data)
  }).catch((err)=>{
    res.json(err);
  });
});


//Delete movie by Id
router.delete('/:movie_id', (req, res, next) => {
  const promise=Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((data)=>{
    if(!data)
      next({message:'The Movie was not found',code:404});
    res.json({status:1})
  }).catch((err)=>{
    res.json(err);
  });
});

//Between two years
router.get('/between/:startYear/:endYear', (req, res, next) => {

  const {startYear,endYear}=req.params;
  const promise=Movie.find({ year:{"$gte":parseInt(startYear),"$lte":parseInt(endYear)} });
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err);
  });
});

module.exports = router; 