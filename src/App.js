import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/project-2" component={Home}/>
    </Switch>
  </BrowserRouter>
)

const Home = () => {
  return <h1>Hello world</h1>
}

export default App