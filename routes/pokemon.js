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
  Pokemon.edit(req.params.id, req.body).then(function(){
    Pokemon.show(req.params.id).then(function(pokemon){
      Pokemon.displayTrainer(pokemon.rows[0].trainer_id).then(function(trainer){
        res.render('pokemon/show', {pokemon: pokemon.rows[0], trainer: trainer.rows[0]})
      })
    })
  })
})

module.exports = router;
