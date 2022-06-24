// USER CRUD

const User = require('../models/User');

// GET ALL USERS
module.exports.getUsers_get = async (req, res) => {
    const users = await User.find();
    res.send(users);
};

// DELETE ONE USER (by id)
module.exports.deleteUser_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteUser = await User.deleteOne({
            _id: id
        });
        res.status(201).json(deleteUser);
    } catch (err) {
        res.status(400).send('An error occurred, user was not deleted');
    }
};

// TODO: EDIT METHODS FOR APP SETTINGS, PASSWORD (+ LEIKODE IN LKCONTOLLER) + DELETE USER ACCOUNT IN APP