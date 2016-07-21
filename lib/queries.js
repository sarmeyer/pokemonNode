var knex = require('../db/knex');

module.exports = {
  all: function(){
    return knex.raw('SELECT * from pokemon');
  },
  create: function(){

  },
  edit: function(){

  },
  destroy: function(){

  },
  show: function(){

  }
}
