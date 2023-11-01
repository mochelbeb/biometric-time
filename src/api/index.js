const { Router } = require('express');

const admin = require('../routes/admin');

const router = Router();

router.use('/', admin);

module.exports = router;