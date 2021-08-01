import './App.css'
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useParams } from 'react-router-dom'
import { isPrime, getLocalDateAsIntegers } from './helpers'

const TwitterLink = ({ user }) => <a href={`https://twitter.com/${user}`}>@{user}</a>

const Footer = () => {
  return (
    <footer>
      <span>
        <Link to='/'>is today prime?</Link> — built by <TwitterLink user='nonrational' /> — inspired by{' '}
        <TwitterLink user='JohnDCook' /> &amp; <TwitterLink user='daniel_egan' />
      </span>
    </footer>
  )
}

const Primality = () => {
  const { region, locale } = useParams()
  const zone = region + '/' + locale

  const primeParts = getLocalDateAsIntegers(zone).map((n) => {
    return { num: n, prime: isPrime(n) }
  })

  const overall = primeParts.some(({ prime }) => prime)

  return (
    <>
      <h1 className='overall'>{overall ? 'Yup.' : 'Nope.'}</h1>
      {/* <h3>{zone}</h3> */}
      <div>
        {primeParts.map(({ num, prime }) => (
          <p key={num}>
            {num} &rarr; {prime ? 'true' : 'false'}
          </p>
        ))}
        <p>
          <a href='https://www.johndcook.com/blog/2013/11/29/todays-a-prime-day/'>international prime?</a> &rarr; ???
        </p>
      </div>
    </>
  )
}

const GeoRedirect = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  useHistory().push(`/${timeZone}`)
  return null
}

function App() {
  return (
    <div className='App'>
      <Router basename={'/istodayprime'}>
        <Switch>
          <Route path='/:region/:locale' component={Primality} />
          <Route path='/' component={GeoRedirect} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
