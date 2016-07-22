var express = require('express');
var router = express.Router();
var knex = require('knex');
var Pokemon = require('../lib/queries');

router.get('/', function(req, res, next) {
  Pokemon.all().then(function(pokemon){
    res.render('gym/index', {pokemon: pokemon.rows});
  })
})
module.exports = router;
