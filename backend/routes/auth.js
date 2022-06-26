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
// check email + password on login
router.post('/login', authController.checkUserCredentials_post);

// generate leikode and token on login
router.post('/login', authController.login_post);

// TODO: LOGOUT
// router.post('/', );

module.exports = router;