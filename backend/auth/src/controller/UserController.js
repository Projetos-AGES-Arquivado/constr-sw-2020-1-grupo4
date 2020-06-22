const { DuplicatedResourceError, ResourceNotFoundError } = require('../errors');
const { User, Role } = require('../models');

module.exports = ({

    create: async (req, res, next) => {
        try {
          const { name, nickname, email, roles } = req.body;
    
          const duplicatedCount = await User.count({ email });
          if (duplicatedCount !== 0) {
            throw new DuplicatedResourceError();
          }
    
          let rolesId = [];
          for(roleName of roles) {
            const role = await Role.findOne({ name: roleName });
            if (role) {
              rolesId.push(role._id);
            } else {
              const newRole = await Role.create({
                name: roleName,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
              rolesId.push(newRole._id);
            }
          }

    
          const user = await User.create({
            name,
            nickname,
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
            roles: rolesId,
          });
    
          res.send(user);
        } catch (err) {
          next(err);
        }
    },

    get: async (req, res, next) => {
        try {
          res.send(await User.find(req.query));
        } catch (err) {
          next(err);
        }
    },

    put: async (req, res, next) => {
      try {
        const { id } = req.params;
        const { roles } = req.body;

        if(roles){
          let rolesId = [];
          for(role of roles) {
            const roleDb = await Role.findOne({ name: role });

            if (roleDb) {
              rolesId.push(roleDb._id);
            } else {
              const newRole = await Role.create({
                name: role,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
              rolesId.push(newRole._id);
            }
          }
          req.body.roles = rolesId;
        }
        
        const user = await User.findByIdAndUpdate({ _id: id }, { ...req.body }, {new: true});

        if (!user) {
          throw new ResourceNotFoundError();
        }

        res.send(user);
      } catch (err) {
        next(err);
      }
    },

    patch: async (req, res, next) => {
      try {
        const { id, attribute } = req.params;
        let attributeToPatch = attribute;

        if(attribute == 'roles') {
          attributeToPatch = 'roles';  
          const names = req.body.roles;
          let rolesId = [];
            for(name of names) {

              const roleDb = await Role.findOne({ name });

              if (roleDb) {
                rolesId.push(roleDb._id)
              } else {
                const newRole = await Role.create({
                  name,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                });
                rolesId.push(newRole._id)
              }
            }
            req.body.roles = rolesId;
          }

        const user = await User.findByIdAndUpdate({ _id: id }, { [attributeToPatch]: req.body[attribute] }, {new: true});
        if (!user) {
          throw new ResourceNotFoundError();
        }
        res.send(user);
      } catch (err) {
        next(err);
      }
    },

    getById: async (req, res, next) => {
        try {
          const user = await User.findById(req.params.id);
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
          await User.deleteOne({ _id: req.params.id });
          res.sendStatus(204);
        } catch (err) {
          next(err);
        }
      }

});