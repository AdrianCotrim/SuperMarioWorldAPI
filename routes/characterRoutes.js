const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController')

router.get('/', characterController.getAllCharacters);
router.get('/:id', characterController.getCharacterById);
router.get('/:id/image', characterController.getCharacterImage);
router.post('/', characterController.createNewCharacter);
router.put('/:id', characterController.updateCharacter)
router.delete('/:id', characterController.deleteCharacter)

module.exports = router;
