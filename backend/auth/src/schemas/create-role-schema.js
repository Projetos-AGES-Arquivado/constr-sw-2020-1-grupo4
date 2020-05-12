const joi = require('@hapi/joi');

const createUserSchema = joi.object({
  body: joi.object({
    name: joi.string().required(),
  }),
});

module.exports = createUserSchema;
