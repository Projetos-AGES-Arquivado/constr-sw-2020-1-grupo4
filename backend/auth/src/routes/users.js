const express = require('express');
const validatorMiddleware = require('../middlewares/validator');
const createUserSchema = require('../schemas/create-user-schema');
const UserController = require('../controller/UserController');


const router = express.Router();

router.post(
  '/',
  validatorMiddleware(createUserSchema),
  UserController.create
);

router.get('/', UserController.get);

router.get('/:id', UserController.getById);

router.delete('/:id', UserController.delete);

module.exports = router;
