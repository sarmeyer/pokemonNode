var knex = require('../db/knex');

module.exports = {
  all: function(){
    return knex.raw('SELECT * from pokemon');
  },
  create: function(pokemon){
    return knex.raw(`INSERT into pokemon values(DEFAULT, '${pokemon.name}', ${pokemon.trainer_id}, ${pokemon.cp}, false)`)
  },
  edit: function(){

  },
  destroy: function(){

  },
  show: function(){

  }
}
