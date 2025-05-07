const express = require('express');
const router = express.Router();
const enemyController = require('../controllers/enemyController')

router.get('/', enemyController.getAllEnemies);
router.get('/:id', enemyController.getEnemyById);
router.get('/:id/image', enemyController.getEnemyImage);
router.post('/', enemyController.createNewEnemy);
router.put('/:id', enemyController.updateEnemy)
router.delete('/:id', enemyController.deleteEnemy)

module.exports = router;
