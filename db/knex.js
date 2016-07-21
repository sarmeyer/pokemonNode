var environment = process.env.DATABASE_URL || 'development';
var config = require('../knexfile')[environment];
module.exports = require('knex')(config);
