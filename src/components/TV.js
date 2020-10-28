import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'

const TV = () => {
  const [series, updateSeries] = useState([])

  useEffect(() => {
    async function getSeriesData() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}`)
      updateSeries(data.results)
      console.log(data)
    }
    getSeriesData()
  }, [])

  return <>
    <Header />
    <main>
      <section className="title">
        <h1>TV SHOWS</h1>
      </section>
      <section className="cards">
        {series.map((show, index) => {
          const imgSrc = `https://image.tmdb.org/t/p/w500/${show.poster_path}`
          return <div key={index} className="card">
            <Link to={`/project-2/tv/${show.id}`}>
              <label>
                <img src={imgSrc} alt=""/>
                <h2 className="show-title">{show.original_name}</h2>
              </label>
            </Link>
          </div>
        })}
      </section>
    </main>
  </>


}

export default TV