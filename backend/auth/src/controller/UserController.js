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
          for(roleId of roles) {
            const role = await Role.find({ name: roleId });
            console.log("roles "+roleId);
            if (role) {
              rolesId.push(role._id);
            } else {
              const newRole = await Role.create({
                name: roleId,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
              rolesId.push(newRole._id);
            }
          }

          console.log("AQUI "+rolesId);
    
          const user = await User.create({
            name,
            nickname,
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
            roles,
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
          for(role of roles) {
            const roleDb = await Role.find({ name: role })[0];

            if (roleDb) {
              req.body.roles.push(newRole._id);
            } else {
              const newRole = await Role.create({
                name: role,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
              req.body.roles.push(newRole._id);
            }
          }
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

        if(attribute == 'roles'){
          attributeToPatch = 'role';
          const name = req.body.roles;
          const roleDb = await Role.find({ name })[0];

          if (roleDb) {
            req.body.roles = roleDb._id;
          } else {
            const newRole = await Role.create({
              name,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            req.body.roles = newRole._id;
          }
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