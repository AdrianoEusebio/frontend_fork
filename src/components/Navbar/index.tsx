import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="container nav">
      <nav>
        <Link to="/">Home</Link> {' | '}
        <Link to="/dashboard">Dashboard</Link> {' | '}
        <Link to="/login">Login</Link>
      </nav>
    </header>
  )
}
