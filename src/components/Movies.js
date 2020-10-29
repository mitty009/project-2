import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'

const Movies = () => {
  const [movies, updateMovies] = useState([])
  const [page, updatePage] = useState(1)
  const [searchVal, updateSearchVal] = useState('')
  const [maxPage, updateMaxPage] = useState(1)


  useEffect(() => {
    async function getMovieData() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`)
      updateMovies(data.results)
    }
    getMovieData()
  }, [])

  if (!movies) {
    return <div className="loader"></div>
  }

  function trending() {
    async function getMovieData() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`)
      updateMovies(data.results)
    }
    getMovieData()
  }

  function other(e) {
    const filter = e
    async function refreshSeries() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${filter}?api_key=${process.env.API_KEY}&language=en-US&page=${page}`)
      updateMovies(data.results)
    }
    refreshSeries()
  }

  function refresh(e) {
    const filter = e
    if (filter === 'trending') {
      trending()
    } else {
      other(filter)
    }
  }

  function refreshSearch(e, p) {
    const filter = e.replace(/\s/g, '%20')
    const pageNum = p
    async function refreshMovies() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${filter}&page=${pageNum}&include_adult=false`)
      updateMovies(data.results)
      updateMaxPage(data.total_pages)
    }
    refreshMovies()
  }

  function truncate(str) {
    return (str.length > 30) ? str.substr(0, 30 - 1) + '...' : str
  }

  return <>
    <Header />
    <section className="main-row">
      <section className="movie">
        <h1>M<span className="text-secondary">OVIES</span></h1>
      </section>
      <main>
        <div>
          <input type="text" className="search" placeholder="Search All..." onKeyPress={(e) => {
            if (e.key === 'Enter') {
              updateSearchVal(e.target.value)
              refreshSearch(e.target.value)
            }
          }} />
          <select className="dropdown" onChange={(e) => {
            refresh(e.target.value)
          }}>
            <option value="trending">Trending</option>
            <option value="popular">Popular</option>
            <option value="now_playing">In Cinemas</option>
            <option value="top_rated">Top Rated</option>
            <option value="upcoming">Coming Soon</option>
          </select>
        </div>

        <section className="cards">
          {movies.map((movie, index) => {
            const imgSrc = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            return <div key={index} className="card">
              <Link to={`/project-2/movies/${movie.id}`}>
                <label>
                  <img src={imgSrc} alt="" />
                  <h2 className="movie-title">{truncate(movie.title)}</h2>
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


export default Movies

