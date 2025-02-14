const express = require('express');
const router = express.Router();
const bossController = require('../controllers/bossController');

router.get('/', bossController.getAllBosses)
router.get('/:id', bossController.getBossById);
router.post('/', bossController.createNewBoss);
router.put('/:id', bossController.updateBoss)
router.delete('/:id', bossController.deleteBoss)

module.exports = router;
