const router = require('express').Router();

const collection = require('./collection');
const task = require('./task');

router.use('/collection/',collection,task);

module.exports = router;