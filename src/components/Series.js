import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import streamLogo from '../img/play-circle-solid.jpg'
import imdbLogo from '../img/imdb-brands.jpg'


const Series = (props) => {
  const [series, updateSeries] = useState([])
  const id = props.match.params.id

  useEffect(() => {
    async function fetchSeries() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`)
      updateSeries(data)
      console.log(data)
    }
    fetchSeries()
  }, [])

  if (!series.poster_path) {
    return <div className="loader"></div>
  }

  return <>
  <Header />
  <section className="main">
    <div className="big-card">
      <div className="card-left">
        <img className="poster-img" src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} alt="" />
      </div>
      <div className="card-right">
        <div className="title-tagline">
          <h1 className="film-title">{series.original_name}</h1>
          <p className="tagline">{series.tagline}</p>
        </div>
        <div className="flex-row">
          <p>Rating: <strong>{series.vote_average} / 10</strong></p>
          <p>|</p>
          <p>Release Date: <strong>{series.first_air_date}</strong></p>
        </div>
        <p>{series.overview}</p>
        <div className="seasons">
          {series.seasons.map((season, index) => {
            return <Link to={`/project-2/tv/${id}/${season.season_number}`} className="season" key={index}>{season.name}</Link>
            
          })}
        </div>
        <div className="links">
          <a href={series.homepage}>
            <img className="stream-butt" src={streamLogo} alt="Stream"/>
          </a>
          <a href={`https://www.imdb.com/title/${series.imdb_id}`}>
            <img className="stream-butt" src={imdbLogo} alt=""/>
          </a>
        </div>
      </div>
    </div>
  </section>

</>
}

export default Series
{/* <p>Runtime: <strong>{Number(series.episode_run_time)}</strong> mins</p> */}
