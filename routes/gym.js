var express = require('express');
var router = express.Router();
var knex = require('knex');
var Pokemon = require('../lib/queries');


router.get('/', function(req, res, next) {
    Pokemon.all().then(function(pokemon){
      res.render('gym/index', {pokemon: pokemon.rows, poke1: req.cookies.p1, poke2: req.cookies.p2});
    })
})
router.get('/join', function(req,res,next){
  Pokemon.show(req.body.pokemon_menu).then(function(pokemon){
    console.log(pokemon);
    res.render('gym/index', {pokemon: pokemon.rows[0]})
  })
})
module.exports = router;
