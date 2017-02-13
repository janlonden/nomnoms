import React from 'react'

import Recipes from './recipes'

const RecipesPage = ({children}) => children ? children : <Recipes/>

export default RecipesPage
