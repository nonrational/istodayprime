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

const TwitterLink = ({ user }) => <a href={`https://twitter.com/${user}`}>@{user}</a>

const Footer = () => {
  return (
    <footer>
      <a href='/'>is today prime?</a>
      built by <TwitterLink user='nonrational' />
      inspired by <TwitterLink user='JohnDCook' /> &amp; <TwitterLink user='daniel_egan' />
    </footer>
  )
}
const Primality = ({ timeZone }) => {
  const primeParts = nowParts(timeZone).map((n) => {
    return { num: n, prime: isPrime(n) }
  })

  const overall = primeParts.some(({ prime }) => prime)

  return (
    <>
      <h1 className='overall'>{overall ? 'Yup.' : 'Nope.'}</h1>
      <div>
        {primeParts.map(({ num, prime }) => (
          <p key={num}>
            {num} =&gt; {prime ? 'true' : 'false'}
          </p>
        ))}
      </div>
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
      <Footer />
    </div>
  )
}

export default App
