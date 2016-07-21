var express = require('express');
var router = express.Router();
var Pokemon = require('../lib/queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Pokemon.all().then(function(pokemon){
    res.render('pokemon/index', {pokemon: pokemon.rows});
  })
});
router.get('/:id', function(req, res, next) {
  Pokemon.show(req.params.id).then(function(pokemon){
    res.render('pokemon/', {pokemon: pokemon.rows[0]});
  })
});

module.exports = router;
