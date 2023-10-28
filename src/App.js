import './App.css'

import {Route, Switch, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'

import Home from './components/Home'

import UserProfile from './components/UserProfile'

import MyProfile from './components/Myprofile'

import PageNotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <Route exact path="/not-found" component={PageNotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
