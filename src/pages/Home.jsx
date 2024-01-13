import React, { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import Template from '../components/Template'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComedy, fetchTopRated, fetchTrending, fetchUpcoming } from '../services/operations/movieFetchApi'
import { setComedy, setTopRated, setTrending, setUpcoming } from '../slices/movieSlice'

const Home = () => {
  const { topRated, trending, comedy, upcoming } = useSelector((state) => state.movie)
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();

  const fetchAllMovies = async () => {
    try {
      const topRatedMov = await fetchTopRated();
      const trendingMov = await fetchTrending();
      const comedyMov = await fetchComedy();
      const upComingMov = await fetchUpcoming();
      dispatch(setTopRated(topRatedMov));
      dispatch(setTrending(trendingMov))
      dispatch(setComedy(comedyMov));
      dispatch(setUpcoming(upComingMov));
      
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  useEffect(() => {
    fetchAllMovies();
  }, [])/* eslint-disable react-hooks/exhaustive-deps */

  useEffect(()=>{
    if (topRated && trending && comedy && upcoming) {
      setMovies([
        { type: 'topRated', movies:topRated },
        { type: 'trending', movies: trending },
        { type: 'comedy', movies: comedy },
        { type: 'upcoming', movies: upcoming },
      ]);
    }
  }, [topRated, trending, comedy, upcoming])

  return (
    <div className='w-full h-full'>
      <HeroSection />
      {movies.length > 0 && movies.map(({ type, movies }, index) => (
          <Template key={index} movieType={type} movie={movies} />
        ))}
    </div>
  )
}

export default Home