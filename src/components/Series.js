import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import streamLogo from '../img/play-circle-solid.png'

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
    return <div className="loading">
      <div className="loader"></div>
    </div>
  }

  return <>
  <Header />
  <section className="main">
    <div className="big-card">
      <div className="card-left">
        <img className="poster-img" src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} alt="" />
      </div>
      <div className="card-right">
        <div>
          <h1 className="film-title">{series.original_name}</h1>
          <p className="tagline">{series.tagline}</p>
        </div>
        <div className="tv-info">
          <p>⭐️ <strong>{series.vote_average} / 10</strong></p>
          <p>|</p>
          <p>🗓 <strong>{series.first_air_date}</strong></p>
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
        </div>
      </div>
    </div>
  </section>

</>
}

export default Series
{/* <p>Runtime: <strong>{Number(series.episode_run_time)}</strong> mins</p> */}
