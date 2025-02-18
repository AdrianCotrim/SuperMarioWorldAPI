const express = require('express');
const router = express.Router();
const world_enemyController = require('../controllers/world_enemyController')

router.post('/', world_enemyController.createWorldEnemy);
router.get('/:world_id', world_enemyController.getEnemyByWorld);
router.delete('/:world_id/:enemy_id', world_enemyController.deleteWorldEnemy);

module.exports = router;
