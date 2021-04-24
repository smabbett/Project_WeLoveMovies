module.exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews')
    .del()
    .then(() => knex('movies_theaters').del())
    .then(() => knex('critics').del())
    .then(() => knex('movies').del())
    .then(() => knex('theaters').del());
};

//   return knex
//     .raw('TRUNCATE TABLE reviews RESTART IDENTITY CASCADE')
//     .then(() =>
//       knex.raw('TRUNCATE TABLE movies_theaters RESTART IDENTITY CASCADE')
//     )
//     .then(() => knex.raw('TRUNCATE TABLE critics RESTART IDENTITY CASCADE'))
//     .then(() => knex.raw('TRUNCATE TABLE movies RESTART IDENTITY CASCADE'))
//     .then(() => knex.raw('TRUNCATE TABLE theaters RESTART IDENTITY CASCADE'));
// };
