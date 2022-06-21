const router = require('express').Router();

// NB: full route is localhost:PORT/api/user/
router.get('/', async (req, res) => {
    res.send('Test route, it works !');
});

// NB full route is localhost:PORT/api/user/register
router.post('/register', async (req, res) => {
    await res.send('Register !');
});



module.exports = router;