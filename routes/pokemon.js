var express = require('express');
var router = express.Router();
var Pokemon = require('../lib/queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Pokemon.all().then(function(pokemon){
    console.log(pokemon.rows);
    res.render('pokemon/index', {pokemon: pokemon.rows});
  })
});

module.exports = router;
