import './App.css'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'

const timeInZone = (timeZone) => {
  const formatter = new Intl.DateTimeFormat([], {
    timeZone: timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  return formatter.format(new Date())
}

const Primality = ({ timeZone }) => {
  const overall = true
  return <p class='overall'>{overall ? 'Yup.' : 'Nope.'}%></p>
}

const GeoRedirect = ({ timeZone }) => {
  useHistory().push(`/${timeZone}`)
  return null
}

function App() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/:region/:zone'>
            <Primality timeZone={timeZone} />
          </Route>
          <Route path='/'>
            <GeoRedirect timeZone={timeZone} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
