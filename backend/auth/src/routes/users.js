const express = require('express');
const { DuplicatedResourceError } = require('../errors');
const validatorMiddleware = require('../middlewares/validator');
const createUserSchema = require('../schemas/create-user-schema');
const { User, Role } = require('../models');

const router = express.Router();

router.post(
  '/',
  validatorMiddleware(createUserSchema),
  async (req, res, next) => {
    try {
      const { name, nickname, email, roleName } = req.body;

      const duplicatedCount = await User.count({ email });
      if (duplicatedCount !== 0) {
        throw new DuplicatedResourceError();
      }

      let roleId;

      const role = await Role.findOne({ name: roleName });
      if (role) {
        roleId = role._id;
      } else {
        const newRole = await Role.create({
          name: roleName,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        roleId = newRole._id;
      }

      const user = await User.create({
        name,
        nickname,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: roleId,
      });

      res.send(user);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
