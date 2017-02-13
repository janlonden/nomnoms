const getRecipes = ({
  req,
  error,
  success,
  Recipe,
  recipesPromise,
  striptags
}) => {
  const {find, limit, skip, sort} = req.body
  const {authorId, query} = find
  const find_ = authorId ? {authorId} : {}

  const response = {
    error: 'Ett fel inträffade vid hämtning av recept.'
  }

  let total

  const sendRecipes = recipes => {
    if (! recipes.length) {
      success({data: recipes, total})

      return
    }

    recipesPromise(recipes)
      .then(recipes => {
        success({data: recipes, total})
      })

      .catch(err => {
        error(response.error)
      })
  }

  const filtered = () => {
    Recipe
      .find(find_)
      .sort(sort)
      .exec((err, recipes) => {
        if (err) {
          error(response.error)

          return
        }

        const wordsFromString = str => striptags(str.toLowerCase())
          .split(' ')
          .filter(word => word)

        const queryWords = wordsFromString(query)

        const wordsFromArray = (array, property) =>
          array.reduce((arrayWords, object) =>
            [
              ... arrayWords,
              ... wordsFromString(object[property])
            ]
          , [])

        const filteredRecipes = recipes
          .filter(recipe => queryWords.every(queryWord =>
            [
              wordsFromString(recipe.title),
              wordsFromString(recipe.description),
              wordsFromArray(recipe.ingredients, 'ingredient'),
              wordsFromArray(recipe.instructions, 'instruction'),
              wordsFromString(recipe.author)
            ]
              .reduce((words, array) => [... words, ... array], [])
              .some(word => word.includes(queryWord))
          ))

          .map((recipe, index, recipes) => {
            if (! index) {
              total = recipes.length
            }

            return recipe
          })

          .slice(skip, limit)

        sendRecipes(filteredRecipes)
      })
  }

  const unFiltered = () => {
    Recipe
      .find(find_)
      .exec((err, recipes) => {
        total = recipes.length
      })

    Recipe
      .find(find_)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .exec((err, recipes) => {
        if (err) {
          error(response.error)

          return
        }

        sendRecipes(recipes)
      })
  }

  query ? filtered() : unFiltered()
}

export default getRecipes
