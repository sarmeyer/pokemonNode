var express = require('express');
var router = express.Router();
var Trainer = require('../lib/queries')
/* GET users listing. */
router.get('/', function(req, res, next) {
  Trainer.showTrainers().then(function(trainers){
    res.render('trainers/index', {trainers: trainers.rows});
  })
});
router.get('/:id', function(req, res, next) {
  Trainer.displayTrainer(req.params.id).then(function(trainer){
    Trainer.trainerPoke(req.params.id).then(function(pokemon){
      res.render('trainers/show', {trainer: trainer.rows[0], pokemon: pokemon.rows});
    })
  })
});

module.exports = router;
