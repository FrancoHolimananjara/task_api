const router = require('express').Router();

const { create,getAll,getById,updateCollection,deleteCollection } = require("../controller/collection")

router.post('/',create);
router.get('/',getAll);
router.get('/:id',getById);
router.put('/:id',updateCollection);
router.delete('/:id',deleteCollection)

module.exports = router;