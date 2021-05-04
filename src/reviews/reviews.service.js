const knex = require('../db/connection');
const addCritics = require('../utils/addCritics');

function read(review_id) {
  return knex('reviews').select('*').where({ review_id }).first();
}

function update(updatedReview) {
  return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select('r.*')
    .where({ 'r.review_id': updatedReview.review_id })
    .update(updatedReview, '*');
}

function readReviewCritic(reviewId) {
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
    .where({ 'r.review_id': reviewId })
    .then(addCritics);
}
function destroy(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
  readReviewCritic,
};
