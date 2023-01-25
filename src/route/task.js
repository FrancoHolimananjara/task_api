const router = require('express').Router();

const { create, getAll, getById, updateTask, deleteTask } = require("../controller/task");
const { auth } = require('../middleware/auth');

router.post('/:collectionId/task/',auth,create);
router.get('/:collectionId/task/',auth,getAll);
router.get('/:collectionId/task/:id',auth,getById);
router.put('/:collectionId/task/:id',auth,updateTask);
router.delete('/:collectionId/task/:id',auth,deleteTask)

module.exports = router;