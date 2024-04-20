let recipes = []

module.exports = {

    constructor() {

    },

    persist() {

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

    search(id) {
        return recipes.filter( recipe => recipe.id === id)
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

        for(let i = 0; i < recipes.length() ; i++) {
            if(recipes[i].id === id) {
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