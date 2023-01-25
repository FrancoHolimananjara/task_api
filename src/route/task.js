const router = require('express').Router();

const { create,getAll,getById,updateTask,deleteTask } = require("../controller/task")

router.post('/:collectionId/task/',create);
router.get('/:collectionId/task/',getAll);
router.get('/:collectionId/task/:id',getById);
router.put('/:collectionId/task/:id',updateTask);
router.delete('/:collectionId/task/:id',deleteTask)

module.exports = router;