import './App.css'
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useParams } from 'react-router-dom'
import { isPrime, getNumericDates } from './helpers'

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
const Bool = ({ val }) => (val ? 'true' : 'false')
const Entry = ({ label, val }) => (
  <p>
    {label} &rarr; <Bool val={val} />
  </p>
)

const Primality = () => {
  const { region, locale } = useParams()
  const zone = [region, locale].join('/')

  const primeParts = getNumericDates(zone).map(({ number, id }) => ({ id, num: number, prime: isPrime(number) }))

  const euroPrime = primeParts.filter(({ id }) => id.startsWith('eu')).some(({ prime }) => prime)
  const usPrime = primeParts.filter(({ id }) => id.startsWith('us')).some(({ prime }) => prime)
  const isoPrime = primeParts.filter(({ id }) => id.startsWith('iso')).some(({ prime }) => prime)

  const intlPrime = euroPrime && usPrime && isoPrime
  const taPrime = euroPrime && usPrime
  const anyPrime = euroPrime || usPrime || isoPrime

  return (
    <>
      <h1 className='overall'>{anyPrime ? 'Yup.' : 'Nope.'}</h1>
      <div>
        {primeParts.map(({ num, prime }) => (
          <Entry key={num} label={num} val={prime} />
        ))}
        {/* <a href='https://www.johndcook.com/blog/2013/11/29/todays-a-prime-day/'>ℹ️</a></span>} */}
        <Entry label='international prime' val={intlPrime} />
        <Entry label='transatlantic prime' val={taPrime} />
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
