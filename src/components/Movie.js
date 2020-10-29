import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import streamLogo from '../img/play-circle-solid.png'
import imdbLogo from '../img/imdb-brands.png'

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
            <div className="flex-row ratings">
              <p>⭐️ <strong>{movie.vote_average} / 10</strong></p>
              <p>|</p>
              <p>🕐 <strong>{movie.runtime}</strong> mins</p>
              <p>|</p>
              <p>🗓 <strong>{movie.release_date}</strong></p>
            </div>
          </div>

          <p className="overview">{movie.overview}</p>

          <div className="links">
            <a href={movie.homepage}>
              <img className="stream-butt" src={streamLogo} alt="Stream" />
            </a>
            <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>
              <img className="stream-butt" src={imdbLogo} alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>

  </>
}

export default Movie