import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=7b9b37b70204eb22b3fef3d72c48305d&language=en-US

const Movie = (props) => {
  const id = props.match.params.id
  const [movie, updateMovie] = useState([])

  useEffect(() => {
    async function fetchMovie() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`)
      updateMovie(data)
      console.log(data)
    }
    fetchMovie()
  }, [])

  if (!movie.poster_path) {
    return <div className="loader"></div>
  }

  return <>
    <Header />
    <section className="main">
      <div className="big-card">
        <div className="card-left">
          <img className="poster-img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
        </div>
        <div className="card-right">
          <div className="title-tagline">
            <h1 className="film-title">{movie.original_title}</h1>
            <p className="tagline">{movie.tagline}</p>
          </div>
          <div className="flex-row">
            <p>Rating: <strong>{movie.vote_average} / 10</strong></p>
            <p>|</p>
            <p>Runtime: <strong>{movie.runtime}</strong> mins</p>
            <p>|</p>
            <p>Release Date: <strong>{movie.release_date}</strong></p>
          </div>
          <p>{movie.overview}</p>

          <div className="links">
            <a href={movie.homepage}>
              <img exact path="../src/img/play-circle-solid.jpg" alt="Stream"/>
            </a>
            <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>Imdb</a>
          </div>
        </div>
      </div>
    </section>

  </>
}

export default Movie