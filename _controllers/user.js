const { validationResult } = require('express-validator');
const userService = require('../_services').user;
const response = require('../_helpers').response;

module.exports = {
  authenticate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors.array()[0].msg);

    userService.authenticate(req.body)
        .then(user => user ? res.json({ ...response, data: { token: user.token } }) : res.status(400).json({ ...response, error: 'Username or password is incorrect'}))
        .catch(err => next(err));
  },
  create(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors.array()[0].msg);

    userService.create(req.body)
        .then(({ id }) => res.json({ ...response, data:  { id }}))
        .catch(err => next(err));
  },
  getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json({ ...response, data:  user}) : res.status(400).json({ ...response, success: false, error: 'User not found'}))
        .catch(err => next(err));
  },
  update(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors.array()[0].msg);

    userService.update(req.params.id, req.body)
        .then(({ id }) => res.json({ ...response, data: { id }}))
        .catch(err => next(err));
  },
  delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ ...response }))
        .catch(err => next(err));
  }
};