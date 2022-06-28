const router = require('express').Router();

const authController = require('../controllers/authController');
const userCrudController = require('../controllers/userCrudController');
const leikodeController = require('../controllers/leikodeController');

// to protect this route, use middleware
const { requireAuth } = require('../middlewares/authMiddleware');

// NB: full route is localhost:PORT/api/user/
// GET ALL USERS
router.get('/', userCrudController.getUsers_get);

// GET USER LOGGED BY EMAIL
router.get('/:id', userCrudController.getUserById_get);

// DELETE ONE USER
router.delete('/:id', userCrudController.deleteUser_delete);

// NB full route is localhost:PORT/api/user/register
// REGISTER (for test)
router.post('/register', authController.register_post);

// LOGIN
// check email + password on login + generate leikode and cookie with token  on login
router.post('/login', authController.login_post);

// PROTECTED ROUTE
router.get('/logged', requireAuth, authController.loggedRoute_get);

// VALIDATE TRANSACTIONS WITH LEIKODE IN PROTECTED ROUTE
// router.post('/', requireAuth, leikodeController.leikode_post);

// TODO: LOGOUT IN PROTECTED ROUTES
router.get('/logout', authController.logout_get);



module.exports = router;