var express = require('express');
var router = express.Router();
var Pokemon = require('../lib/queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Pokemon.all().then(function(pokemon){
    res.render('pokemon/index', {pokemon: pokemon.rows});
  })
})
router.get('/new', function(req,res,next){
  res.render('pokemon/new')
})
router.post('/', function(req, res, next) {
  Pokemon.create(req.body).then(function(){
    res.redirect('/pokemon');
  })
})
router.get('/:id', function(req,res,next){
  Pokemon.show(req.params.id).then(function(pokemon){
    Pokemon.displayTrainer(pokemon.rows[0].trainer_id).then(function(trainer){
      res.render('pokemon/show', {pokemon: pokemon.rows[0], trainer: trainer.rows[0]})
    })
  })
})
router.get('/:id/edit', function(req,res,next){
  Pokemon.show(req.params.id).then(function(pokemon){
    Pokemon.displayTrainer(pokemon.rows[0].trainer_id).then(function(trainer){
      Pokemon.showTrainers().then(function(trainers){
      res.render('pokemon/edit', {pokemon: pokemon.rows[0], trainer: trainer.rows[0], trainers: trainers.rows})
      })
    })
  })
})
router.post('/:id', function(req, res, next) {
  console.log('*******************');
  console.log(req.body.trainers_names);
  Pokemon.edit(req.params.id, req.body).then(function(){
    Pokemon.editTrainer(req.params.id, req.body.trainers_names).then(function(){
      Pokemon.show(req.params.id).then(function(pokemon){
        Pokemon.displayTrainer(pokemon.rows[0].trainer_id).then(function(trainer){
          res.render('pokemon/show', {pokemon: pokemon.rows[0], trainer: trainer.rows[0]})
        })
      })
    })
  })
})
router.get('/:id/delete', function(req,res,next){
  Pokemon.destroy(req.params.id).then(function(){
    res.redirect('/pokemon')
  })
})
router.get('/assign/:id', function(req,res,next){
  if(!res.cookie.p1) {
    res.cookie('p1', req.params.id);
      res.redirect('/');
  } else if(!res.cookie.p2){
    res.cookie('p2', req.params.id);
    res.redirect('/pokemon')
    }
  })
router.get('/remove/:id', function(req,res,next){
  if(res.cookie.p1 === req.params.id || res.cookie.p2 === req.params.id){
    res.clearCookie()
  }
})
module.exports = router;
