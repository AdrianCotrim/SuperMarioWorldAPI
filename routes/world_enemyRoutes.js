const express = require('express');
const router = express.Router();
const world_enemyController = require('../controllers/world_enemyController')

router.get('/', world_enemyController.getAllWorldEnemies);
router.get('/:world_id', world_enemyController.getEnemyByWorld);
router.post('/', world_enemyController.createWorldEnemy);
router.delete('/:world_id/:enemy_id', world_enemyController.deleteWorldEnemy);

module.exports = router;
