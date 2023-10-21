const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');

class UserService{

    createUser = async data => await UserModel.create(data);

    updateUser = async (_id,data) => await UserModel.updateOnce({_id},data);

    findUser = async filter => await UserModel.findOne(filter);

    findUsers = async filter => await UserModel.find(filter);

    updateUser = async (filter,data) => await UserModel.findOneAndUpdate(filter,data);

    verifyPassword = async (password,hash) => await bcrypt.compare(password,hash);

}

module.exports = new UserService();