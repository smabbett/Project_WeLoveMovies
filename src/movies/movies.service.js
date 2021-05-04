const knex = require('../db/connection');
const addCritics = require('../utils/addCritics');

function list() {
  return knex('movies as m').select('m.*');
}

function listNowPlaying() {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .distinct('m.*')
    .where({ 'mt.is_showing': true });
}

function listReviews(movieId) {
  return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select(
      'r.*',
      'c.critic_id as c_critic_id',
      'c.preferred_name as c_preferred_name',
      'c.surname as c_surname',
      'c.organization_name as c_organization_name',
      'c.created_at as c_created_at',
      'c.updated_at as c_updated_at'
    )
    .where({ 'r.movie_id': movieId })
    .then(addCritics);
}

function listTheaters(movieId) {
  return knex('theaters as t')
    .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
    .join('movies as m', 'mt.movie_id', 'm.movie_id')
    .select('t.*', 'mt.is_showing', 'm.movie_id')
    .where({ 'm.movie_id': movieId });
}

function read(movie_id) {
  return knex('movies as m')
    .select('*')
    .where({ 'm.movie_id': movie_id })
    .first();
}

module.exports = {
  list,
  listReviews,
  listTheaters,
  read,
  listNowPlaying,
};
