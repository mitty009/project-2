import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'

const TV = () => {
  const [series, updateSeries] = useState([])
  const [page, updatePage] = useState(1)
  const [searchVal, updateSearchVal] = useState('')
  const [maxPage, updateMaxPage] = useState(1)

  useEffect(() => {
    async function getSeries() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
      updateSeries(data.results)
    }
    getSeries()
  }, [])

  function refresh(e) {
    const filter = e
    async function refreshSeries() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${filter}?api_key=${process.env.API_KEY}&language=en-US&page=1`)
      updateSeries(data.results)
    }
    refreshSeries()
  }

  function refreshSearch(e, p) {
    const filter = e.replace(/\s/g, '%20')
    const pageNum = p
    async function refreshSeries() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=en-US&page=${pageNum}&query=${filter}&include_adult=false`)
      updateSeries(data.results)
      updateMaxPage(data.total_pages)
    }
    refreshSeries()
  }

  function truncate(str) {
    return (str.length > 30) ? str.substr(0, 30 - 1) + '...' : str
  }

  return <>
    <Header />
    <section className="main-row">
      <section className="movie">
        <h1>TV<span className="text-secondary">SHOWS</span></h1>
      </section>
      <main>
        <div className="filters">
          <input type="text" className="search" placeholder="Search All..." onKeyPress={(e) => {
            if (e.key === 'Enter') {
              updateSearchVal(e.target.value)
              refreshSearch(e.target.value)
            }
          }} />
          <select className="dropdown" onChange={(e) => {
            refresh(e.target.value)
          }}>
            <option value="popular">Popular</option>
            <option value="airing_today">Airing Today</option>
            <option value="top_rated">Top Rated</option>
          </select>
        </div>
        <section className="cards">
          {series.map((show, index) => {
            const imgSrc = `https://image.tmdb.org/t/p/w500/${show.poster_path}`
            return <div key={index} className="card">
              <Link to={`/project-2/tv/${show.id}`}>
                <label>
                  <img src={imgSrc} alt="" />
                  <h2 className="show-title">{truncate(show.original_name)}</h2>
                </label>
              </Link>
            </div>
          })}
        </section>
        <div className='page-num'>
          <button onClick={() => {
            if (page <= 1) {
              return
            } else {
              updatePage(page - 1)
              refreshSearch(searchVal, page - 1)
              console.log(page)
              console.log(maxPage)
            }
          }}>{'<'}</button>

          <p>{page}</p>
          <button onClick={() => {
            if (maxPage === page) {
              return
            } else {
              updatePage(page + 1)
              refreshSearch(searchVal, page + 1)
              console.log(page)
              console.log(maxPage)
            }
          }}>{'>'}</button>
        </div>
      </main>
    </section>

  </>
}

export default TV