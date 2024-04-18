const { Router } = require('express');
const recipesController = require('../controllers/recipes');
const router = Router();

// Rotas de exemplo
router.get('/', recipesController.getTest);
router.post('/', recipesController.setTest);

module.exports = router;
