const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.get('/:id/image', itemController.getItemImage);
router.post('/', itemController.createNewItem);
router.put('/:id', itemController.updateItem)
router.delete('/:id', itemController.deleteItem)

module.exports = router;