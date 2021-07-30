import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const Primality = (a) => {
  debugger
  return <>Not Sure!</>
}

const GeoLocate = () => {}

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/:first/:second'>
            <Primality />
          </Route>
          <Route path='/'>
            <GeoLocate />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
