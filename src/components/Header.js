import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return <nav>
    <button><Link className="link" to="/project-2/tv">TV</Link></button> 
    <button><Link className="link" to="/project-2/movies">MOVIES</Link></button> 
  </nav>

}
export default Header