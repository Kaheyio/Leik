// TODO: create controller linked to this route

// TEST PROTECTED ROUTE
const router = require('express').Router();

// to protect this route, use middleware
const { requireAuth } = require('../middlewares/authMiddleware');

const authController = require('../controllers/authController');
const leikodeController = require('../controllers/leikodeController');


// ROUTE PROTECTION
router.get('/', requireAuth, authController.protectedRoute_get);


// VALIDATE TRANSACTIONS WITH LEIKODE IN PROTECTED ROUTE
router.post('/', requireAuth, leikodeController.leikode_post);


module.exports = router;