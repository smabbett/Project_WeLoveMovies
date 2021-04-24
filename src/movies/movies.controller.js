const service = require('./movies.service.js');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
//const addCritics = require('../utils/treeize');

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function listReviews(req, res, next) {
  const { movieId } = req.params;
  let reviews = await service.listReviews(movieId);
  res.json({ data: reviews });
}

async function listTheaters(req, res, next) {
  const { movieId } = req.params;
  res.json({ data: await service.listTheaters(movieId) });
}
function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function listNowPlaying(req, res) {
  const is_showing = req.query.is_showing;
  if (is_showing) {
    res.json({ data: await service.listNowPlaying() });
  } else {
    res.json({ data: await service.list() });
  }
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  listReviews: asyncErrorBoundary(listReviews),
  listTheaters: asyncErrorBoundary(listTheaters),
  listNowPlaying: asyncErrorBoundary(listNowPlaying),
};
