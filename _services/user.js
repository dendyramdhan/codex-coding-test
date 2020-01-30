const User = require('../_models/index').User;
const config = require('../_configs/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async authenticate({ email, password }) {
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password']
    });
    
    if (user && bcrypt.compareSync(password, user.dataValues.password)) {
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
          token
      };
    }
  },
  async getAll() {
    return await User
      .findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
  },
  async getById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });
  },
  async create(userParam) {
      // validate
      if (await User.findOne({ 
        where: { email: userParam.email },
        attributes: ['email']
      })) throw 'Email "' + userParam.email + '" is already taken';

      // hash password
      if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
      }

      // save user
      return await User.create(userParam);
  },
  async update(id, userParam) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    // validate
    if (!user) throw 'User not found';

    if (userParam.mobileNumber && user.mobileNumber !== userParam.mobileNumber && await User.findOne({
      where: { mobileNumber: userParam.mobileNumber },
      attributes: ['id', 'mobileNumber']
    })) {
        throw 'Mobile Number "' + userParam.mobileNumber + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    const userEdit = {
      fullName: userParam.fullName ? userParam.fullName : user.fullName,
      password: userParam.password ? userParam.password : user.password,
      telepon: userParam.telepon ? userParam.telepon : user.telepon
    }

    return await user.update(userEdit);
  },
  async delete(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });

    // validate
    if (!user) throw 'User not found';

    return await user.destroy();
  }
};