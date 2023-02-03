const router = require('express').Router();
const userroute = require('./userroute');

router.use('/users', userroute);

module.exports = router;