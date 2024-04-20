const recipeService = require('../services/recipe');

let recipes = []

module.exports = {

    async populate() {
        const data = await recipeService.getRecipe();
        recipes = JSON.parse(data)
    },

    create(id, data) {
        const recipe = {
            id: id,
            name: data.name,
            createdDate: data.createdDate,
            category: data.category,
            ingredients: data.ingredients,
            methodOfPreparation: data.methodOfPreparation
        }

        recipes.push(recipe)
        //console.log(recipes)
    },

    async search(id) {
        let recipe
        //await this.populate()
        //.then(
            recipe = recipes.filter( recipe => recipe.id == id)
        //)
        
        return recipe
        
    },

    update(id, data) {
        const recipe = {
            id: id,
            name: data.name,
            createdDate: data.createdDate,
            category: data.category,
            ingredients: data.ingredients,
            methodOfPreparation: data.methodOfPreparation
        }
        
        for(let i = 0; i < recipes.length ; i++) {
            if(recipes[i].id == id) {
                recipes[i] = recipe
            }
        }
    },

    delete(id) {
        const updatedRecipes = recipes.filter( recipe => recipe.id != id)

        recipes = updatedRecipes
    },

    getRecipes() {
        return recipes
    }
}