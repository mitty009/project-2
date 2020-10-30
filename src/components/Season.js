import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'

const Season = (props) => {
  const id = props.match.params.id
  const seasonNumber = props.match.params.season
  const [season, updateSeason] = useState([])
  const image = `https://image.tmdb.org/t/p/w500${season.poster_path}`

  useEffect(() => {
    async function getSeason() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${process.env.API_KEY}`)
      updateSeason(data)
      console.log(data)
    }
    getSeason()
  }, [])

  if (!season.poster_path) {
    return <div className="loading">
      <div className="loader"></div>
    </div>
  }

  return <>
    <Header />
    <section className="main">
      <div className="big-card-series color-primary column" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`, backgroundPosition: 'center', backgroundColor: 'grey', backgroundSize: 'cover' }}>
        <div className="top flex-row">
          <div className="title-tagline">
            <h1 className="film-title season-title">{season.name}</h1>
          </div>
          <div>
            <p>Release Date: <strong>{season.air_date}</strong></p>
          </div>
        </div>
        <div className="bottom">
          <div className="episodes">
            {season.episodes.map((el, ind) => {
              return <div key={ind} className="episode">
                <p>Episode {el.episode_number} - {el.name}</p>
                {/* <p>{el.overview}</p> */}
              </div>
            })}
          </div>
          <div className="links">
            {/* <a href={season.homepage}>
              <img className="stream-butt" src={streamLogo} alt="Stream" />
            </a>
            <a href={`https://www.imdb.com/title/${series.imdb_id}`}>
              <img className="stream-butt" src={imdbLogo} alt="" />
            </a> */}
          </div>
        </div>

      </div>
    </section>

  </>
}

{/* <img className="poster-img" src={image} alt="" /> */ }

export default Season