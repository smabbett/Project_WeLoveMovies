const { add } = require('lodash');

function addCritics(reviews) {
  return reviews.map((review) => {
    return {
      review_id: review.review_id,
      content: review.content,
      score: review.score,
      created_at: review.created_at,
      updated_at: review.updated_at,
      critic_id: review.critic_id,
      movie_id: review.movie_id,
      critic: {
        critic_id: review.c_critic_id,
        preferred_name: review.c_preferred_name,
        surname: review.c_surname,
        organization_name: review.c_organization_name,
        created_at: review.c_created_at,
        updated_at: review.c_updated_at,
      },
    };
  });
}

module.exports = addCritics;
