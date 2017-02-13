const getRecipe = ({req, error, success, Recipe, recipePromise}) => {
  const {_id} = req.body

  const response = {
    error: 'Ett fel inträffade vid hämtning av recept.'
  }

  Recipe.findById(_id, (err, recipe) => {
    if (err) {
      error(response.error)

      return
    }

    recipePromise(recipe)
      .then(recipe => {
        success({data: recipe})
      })

      .catch(err => {
        error(response.error)
      })
  })
}

export default getRecipe
