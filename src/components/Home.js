import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return <div className="home">
    <section className="left">
      <Link className="home-butt" to="/project-2/tv">TV Shows</Link>
    </section>
    <section className="right">
      <Link className="home-butt" to="/project-2/movies">Movies</Link>
    </section>
  </div>
}

export default Home