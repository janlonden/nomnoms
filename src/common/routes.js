import {Route, IndexRoute} from 'react-router'
import React from 'react'

import Home from './components/home/home'
import Layout from './components/layout/layout'
import Recipe from './components/recipes/recipe'
import RecipesPage from './components/recipes/recipes-page'
import User from './components/users/user'

const routes =
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="recept" component={RecipesPage}>
      <Route path=":_id" component={Recipe} />
    </Route>
    <Route path="jag" component={User} />
  </Route>

export default routes
