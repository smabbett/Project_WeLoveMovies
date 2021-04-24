const router = require('express').Router({ mergeParams: true });
const controller = require('./movies.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

//const theatersRouter = require('../theaters/theaters.router');
//const reviewsRouter = require('../reviews/reviews.router');

//should be handled by theaters router?
router
  .route('/:movieId([0-9]+)/theaters')
  .get(controller.listTheaters)
  .all(methodNotAllowed);
//should be handled by reviews router?
router
  .route('/:movieId([0-9]+)/reviews')
  .get(controller.listReviews)
  .all(methodNotAllowed);

router.route('/:movieId([0-9]+)').get(controller.read).all(methodNotAllowed);
// router
//   .route('/?is_showing=true')
//   .get(controller.listNowPlaying)
//   .all(methodNotAllowed);
router.route('/').get(controller.listNowPlaying).all(methodNotAllowed);

module.exports = router;
