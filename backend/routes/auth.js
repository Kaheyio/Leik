const router = require('express').Router();
const Users = require('../db_model/Users');

// NB: full route is localhost:PORT/api/user/
router.get('/', async (req, res) => {
    const users = await Users.find();
    res.send(users);
});


// NB full route is localhost:PORT/api/user/register
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // check if user already exists
    const findUser = await Users.findOne({
        email
    });
    if (findUser != null) {
        res.send('This user already exists');
        return;
    }

    const user = new Users({
        username,
        email,
        password
    });


    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleteUser = await Users.deleteOne({
            _id: id
        });
        res.json(deleteUser);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;