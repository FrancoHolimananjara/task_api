const router = require('express').Router();

const { create, getAll, getById, updateCollection, deleteCollection } = require("../controller/collection");
const { auth } = require('../middleware/auth');

router.post('/',auth,create);
router.get('/',auth,getAll);
router.get('/:id',auth,getById);
router.put('/:id',auth,updateCollection);
router.delete('/:id',auth,deleteCollection)

module.exports = router;