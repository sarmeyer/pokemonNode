var express = require('express');
var router = express.Router();
var Pokemon = require('../lib/queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Pokemon.all().then(function(pokemon){
    res.render('pokemon/index', {pokemon: pokemon.rows});
  })
});
router.get('/new', function(req,res,next){
  res.render('pokemon/new')
})
router.post('/', function(req, res, next) {
  Pokemon.create(req.params.id).then(function(pokemon){
    res.redirect('/');
  })
});

module.exports = router;
