const joi = require('@hapi/joi');

const createUserSchema = joi.object({
  body: joi.object({
    name: joi.string().required(),
    nickname: joi.string().required(),
    email: joi.string().email().required(),
    roles: joi.array().items(joi.string()).required(),
  })
});

const updateUserSchema =  joi.object({
  body: joi.object({
    name: joi.string(),
    nickname: joi.string(),
    email: joi.string().email(),
    roles: joi.array().items(joi.string()),
  }).or('name', 'nickname', 'email', 'roleName')
});

module.exports = {createUserSchema, updateUserSchema};
