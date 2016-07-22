var knex = require('../db/knex');

module.exports = {
    all: function() {
        return knex.raw('SELECT * from pokemon');
    },
    create: function(pokemon) {
        return knex.raw(`INSERT into pokemon values(DEFAULT, '${pokemon.name}', ${pokemon.trainer_id}, ${pokemon.cp}, in_gym=${pokemon.in_gym})`)
    },
    edit: function(id, pokemon) {
        return knex.raw(`UPDATE pokemon SET name='${pokemon.name}', trainer_id=${pokemon.trainer_id}, cp=${pokemon.cp}, in_gym=${pokemon.in_gym} WHERE id=${id}`)
    },
    editTrainer: function(id, trainer) {
        return knex.raw(`UPDATE pokemon SET trainer_id=trainers.id from pokemon JOIN trainers ON pokemon.trainer_id=trainers.id WHERE pokemon.id=${id}`)
    },
    destroy: function(id) {
        return knex.raw(`DELETE from pokemon WHERE id=${id}`)
    },
    show: function(id) {
        return knex.raw(`SELECT * from pokemon WHERE id=${id}`)
    },
    displayTrainer: function(id) {
        return knex.raw(`SELECT * from trainers WHERE id=${id}`)
    },
    showTrainers: function() {
        return knex.raw('SELECT * from trainers')
    },
    trainerPoke: function(id){
      return knex.raw(`SELECT pokemon.name FROM trainers JOIN pokemon ON pokemon.trainer_id = trainers.id WHERE trainers.id=${id}`)
    },
    gymStatus: function(id, value){
      return knex.raw(`UPDATE pokemon SET in_gym = ${value} WHERE id=${id}`)
    },
    showbyName: function(pokemon){
      return knex.raw(`SELECT * from pokemon WHERE name='${pokemon.pokemon_menu}'`)
    }
}
