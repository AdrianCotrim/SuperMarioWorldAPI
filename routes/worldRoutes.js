const express = require('express');
const router = express.Router();
const worldController = require('../controllers/worldController')

router.get('/', worldController.getAllWorlds);
router.get('/:id', worldController.getWorldById);
router.get('/:id/image', worldController.getWorldImage);
router.post('/', worldController.createNewWorld);
router.put('/:id', worldController.updateWorld)
router.delete('/:id', worldController.deleteWorld)

module.exports = router;
