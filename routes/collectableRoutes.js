const express = require('express');
const router = express.Router();
const collectableController = require('../controllers/collectableController');

router.get('/', collectableController.getAllCollectables);
router.get('/:id', collectableController.getCollectableById);
router.post('/', collectableController.createNewCollectable);
router.put('/:id', collectableController.updateCollectable)
router.delete('/:id', collectableController.deleteCollectable)

module.exports = router;