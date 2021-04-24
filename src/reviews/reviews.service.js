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

// function addCritics(reviews) {
//   return reviews.map((review) => {
//     return {
//       review_id: review.review_id,
//       content: review.content,
//       score: review.score,
//       created_at: review.created_at,
//       updated_at: review.updated_at,
//       critic_id: review.critic_id,
//       movie_id: review.movie_id,
//       critic: {
//         critic_id: review.c_critic_id,
//         preferred_name: review.c_preferred_name,
//         surname: review.c_surname,
//         organization_name: review.c_organization_name,
//         created_at: review.c_created_at,
//         updated_at: review.c_updated_at,
//       },
//     };
//   });
// }

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
