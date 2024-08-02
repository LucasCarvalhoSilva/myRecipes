const { Router } = require('express');
const recipesController = require('../controllers/recipes');
const userController = require('../controllers/user');
const authController = require('../controllers/auth')
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
router.get('/recipe/category/:category', recipesController.readByCategory)
router.get('/recipe/sort/recents', recipesController.sortByDate)


// Rotas de usuario
router.post('/user', userController.createUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.get('/user/:id', userController.searchUser)
router.get('/user/', userController.getAllUsers)

// Rotas de login
router.post('/auth', authController.login)
router.delete('/auth', authController.logout)

module.exports = router;