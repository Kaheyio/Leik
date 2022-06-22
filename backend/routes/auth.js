const router = require('express').Router();

const authController = require('../controllers/authController');
const userCrudController = require('../controllers/userCrudController');

// NB: full route is localhost:PORT/api/user/
// FET ALL USERS
router.get('/', userCrudController.getUsers_get);

// DELETE ONE USER
router.delete('/:id', userCrudController.deleteUser_delete);

// NB full route is localhost:PORT/api/user/register
// REGISTER
router.post('/register', authController.register_post);

// LOGIN
router.post('/login', authController.login_post);

// LOGOUT
// router.post('/', );

module.exports = router;