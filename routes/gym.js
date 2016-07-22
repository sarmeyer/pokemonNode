var express = require('express');
var router = express.Router();
var knex = require('knex');
var Pokemon = require('../lib/queries');


router.get('/', function(req, res, next) {
  var poke1;
  var poke2;
  var p1 = Number(req.cookies.p1);
  var p2 = Number(req.cookies.p2);
  Pokemon.all().then(function(pokemon){
    var obj = pokemon.rows;
      obj.forEach(function(poke){
        if(poke.id === p1){
          poke1 = poke;
        } else if(poke.id === p2){
          poke2 = poke;
        }
      })
      res.render('gym/index', {pokemon: pokemon.rows, poke1: poke1, poke2: poke2, p1:p1, p2:p2})
    })
})
module.exports = router;
