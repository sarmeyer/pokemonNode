var knex = require('../db/knex');

module.exports = {
  all: function(){
    return knex.raw('SELECT * from pokemon');
  },
  create: function(pokemon){
    return knex.raw(`INSERT into pokemon values(DEFAULT, '${pokemon.name}', ${pokemon.trainer_id}, ${pokemon.cp}, false)`)
  },
  edit: function(id){

  },
  destroy: function(id){
    return knex.raw(`DELETE from pokemon WHERE id=${id}`)
  },
  show: function(id){
    return knex.raw(`SELECT * from pokemon WHERE id=${id}`)
  },
  displayTrainer: function(id){
    return knex.raw(`SELECT * from trainers WHERE id=${id}`)
  }
}
