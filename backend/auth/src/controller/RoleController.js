const { DuplicatedResourceError, ResourceNotFoundError } = require('../errors');
const { Role } = require('../models');

module.exports = ({

    create: async (req, res, next) => {
        try {
          const { name } = req.body;
    
          const duplicatedCount = await Role.count({ name });
          if (duplicatedCount !== 0) {
            throw new DuplicatedResourceError();
          }
    
          const role = await Role.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
          });
    
          res.send(role);
        } catch (err) {
          next(err);
        }
    },

    get: async (req, res, next) => {
        try {
          res.send(await Role.find(req.query));
        } catch (err) {
          next(err);
        }
    },


    getById: async (req, res, next) => {
        try {
          const user = await Role.findById(req.params.id);
          if (!user) {
            throw new ResourceNotFoundError();
          }
          res.send(user);
        } catch (err) {
          next(err);
        }
    },

    update: async (req, res, next) => {
      try {
        const { id } = req.params;
        const user = await Role.findByIdAndUpdate({ _id: id }, { ...req.body }, {new: true});
        if (!user) {
          throw new ResourceNotFoundError();
        }
        res.send(user);
      } catch (err) {
        next(err);
      }
  },


    delete: async (req, res, next) => {
        try {
          await Role.deleteOne({ _id: req.params.id });
          res.sendStatus(204);
        } catch (err) {
          next(err);
        }
      }

});