const router = require('express').Router();

const collection = require('./collection');
const task = require('./task');
const auth = require('./auth');

router.use('/auth/',auth);
router.use('/collection/',collection,task);

module.exports = router;