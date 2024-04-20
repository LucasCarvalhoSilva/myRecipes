const { Router } = require('express');
const recipesController = require('../controllers/recipes');
const router = Router();

// Rotas de exemplo
//router.get('/', recipesController.getTest);
//router.post('/', recipesController.setTest);

// Rotas de receita
router.post('/recipe', recipesController.createRecipe)
router.delete('/recipe/:id', recipesController.deleteRecipe)
router.get('/recipe/:id', recipesController.searchRecipe)
router.get('/recipe/', recipesController.readAllRecipe)
router.put('/recipe/:id', recipesController.editRecipe)

module.exports = router;
