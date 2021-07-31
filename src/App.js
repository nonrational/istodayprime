import './App.css'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'

const isPrime = (num) => {
  if (num <= 1) {
    return true
  } else if (num <= 3) {
    return true
  } else if (num % 2 === 0 || num % 3 === 0) {
    return false
  }

  let i = 5
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false
    }
    i += 6
  }
  return true
}

const getPart = (o, name) => o.find((part) => part.type === name).value

const nowParts = (timeZone) => {
  const formatter = new Intl.DateTimeFormat([], {
    timeZone: timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  const parts = formatter.formatToParts(new Date())

  return [
    `${getPart(parts, 'year')}${getPart(parts, 'month')}${getPart(parts, 'day')}`,
    `${getPart(parts, 'month')}${getPart(parts, 'day')}${getPart(parts, 'year')}`,
    `${getPart(parts, 'day')}${getPart(parts, 'month')}${getPart(parts, 'year')}`,
  ].map((s) => Number.parseInt(s))
}

const Primality = ({ timeZone }) => {
  const primeParts = nowParts(timeZone).map((n) => {
    return { num: n, prime: isPrime(n) }
  })

  const overall = primeParts.some(({ prime }) => prime)

  return (
    <>
      <p className='overall'>{overall ? 'Yup.' : 'Nope.'}</p>
      <ul>
        {primeParts.map(({ num, prime }) => (
          <li key={num}>
            {num} - {prime ? 'prime' : 'not-prime'}
          </li>
        ))}
      </ul>
    </>
  )
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
