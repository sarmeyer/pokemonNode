var express = require('express');
var router = express.Router();
var Trainer = require('../lib/queries')
/* GET users listing. */
router.get('/', function(req, res, next) {
  Trainer.showTrainers().then(function(trainers){
    res.render('trainers/index', {trainers: trainers.rows});
  })
});

module.exports = router;
