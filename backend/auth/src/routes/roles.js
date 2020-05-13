const express = require('express');
const validatorMiddleware = require('../middlewares/validator');
const createSchema = require('../schemas/create-role-schema');
const RoleController = require('../controller/RoleController');


const router = express.Router();

router.post(
  '/',
  validatorMiddleware(createSchema),
  RoleController.create
);

router.get('/', RoleController.get);

router.get('/:id', RoleController.getById);

router.put(
  '/:id', 
  validatorMiddleware(createSchema), 
  RoleController.update
);

router.patch(
  '/:id/name',  
  validatorMiddleware(createSchema), 
  RoleController.update
);

router.delete('/:id', RoleController.delete);

module.exports = router;
