import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'

const Movies = () => {
  const [movies, updateMovies] = useState([])

  useEffect(() => {
    async function getMovieData() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`)
      updateMovies(data.results)
      console.log()
    }
    getMovieData()
  }, [])

  return <>
    <Header />
    <main>
      <section className="title">
        <h1>MOVIES</h1>
      </section>
      <section className="cards">
        {movies.map((movie, index) => {
          const imgSrc = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          return <div key={index} className="card">
            <Link to={`/project-2/movies/${movie.id}`}>
              <label>
                <img src={imgSrc} alt="" />
                <h2 className="movie-title">{movie.title}</h2>
              </label>
            </Link>
          </div>
        })}
      </section>
    </main>

  </>

}


export default Movies

