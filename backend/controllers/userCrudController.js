// USER CRUD

const Users = require('../models/Users');

// GET ALL USERS
module.exports.getUsers_get = async (req, res) => {
    const users = await Users.find();
    res.send(users);
};

// DELETE ONE USER (by id)
module.exports.deleteUser_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteUser = await Users.deleteOne({
            _id: id
        });
        res.json(deleteUser);
    } catch (err) {
        res.status(400).send(err);
    }
};