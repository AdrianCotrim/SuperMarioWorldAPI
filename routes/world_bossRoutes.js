const express = require('express');
const router = express.Router();
const world_bossController = require('../controllers/world_bossController')

router.post('/', world_bossController.createWorldBoss);
router.get('/', world_bossController.getAllWorldBosses);
router.get('/:world_id', world_bossController.getBossesByWorld);
router.delete('/:world_id/:boss_id', world_bossController.deleteWorldBoss);

module.exports = router;
