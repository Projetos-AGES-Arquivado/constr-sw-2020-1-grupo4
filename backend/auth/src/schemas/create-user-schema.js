const joi = require('@hapi/joi');

const createUserSchema = joi.object({
  body: joi.object({
    name: joi.string().required(),
    nickname: joi.string().required(),
    email: joi.string().email().required(),
    roleName: joi.string().required(),
  }),
});

module.exports = createUserSchema;
