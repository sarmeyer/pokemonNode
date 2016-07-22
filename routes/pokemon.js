var express = require('express');
var router = express.Router();
var knex = require('knex');
var Pokemon = require('../lib/queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Pokemon.all().then(function(pokemon){
    res.render('pokemon/index', {pokemon: pokemon.rows, p1: Number(req.cookies.p1), p2: Number(req.cookies.p2)});
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
router.get('/:id/assign', function(req,res,next){
  Pokemon.gymStatus(req.params.id, 'true').then(function(){
  if(!req.cookies.p1) {
    res.cookie('p1', req.params.id);
    } else {
    res.cookie('p2', req.params.id);
      }
      res.redirect('/');
    })
  })
  router.post('/join/:player', function(req,res,next){
    console.log('*************');
    console.log(req.body.pokemonid);
    Pokemon.gymStatus(req.body.pokemonid, 'true').then(function(){
      res.cookie(req.params.player, req.body.pokemonid);
      res.redirect('/gym');
    })
  })
router.post('/:id/remove/:player', function(req,res,next){
    Pokemon.gymStatus(req.params.id, 'false').then(function(req,res,next){
        res.clearCookie(req.params.player);
          res.redirect('/')
    })
})

module.exports = router;
