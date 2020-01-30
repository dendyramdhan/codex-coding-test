const express = require('express');
const router = express.Router();
const userController = require('../_controllers').user;
const userValidator = require('../_validators').user;
const isAdmin = require('../_helpers').isAdmin;
const isUser = require('../_helpers').isUser;

router.post('/authenticate', userValidator.authenticate, userController.authenticate);
router.post('/', isAdmin, userValidator.create, userController.create);
router.put('/:id', isUser, userValidator.update, userController.update);
router.delete('/:id', isAdmin, userController.delete);

module.exports = router;
