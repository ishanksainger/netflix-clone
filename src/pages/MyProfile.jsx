import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, fetchLikedMovies } from '../services/operations/profileApi';
import { setUser } from '../slices/profileSlice';

const MyProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const [response, setResponse] = useState([]);
  const { user } = useSelector((state) => state.profile)
  const dispatch=useDispatch();

  const fetchMovie = async () => {
    try {
      const res = await fetchLikedMovies(token);
      setResponse(res);
    } catch (error) {
      console.log("Could not fetch Liked Movies");
    }
  };

  const removeMovie = async (movieToRemove) => {
    try {
      if (movieToRemove) {
        const res = await deleteMovie(token, movieToRemove.id);
        const filterMovies = res.filter((movie) => movie.id !== movieToRemove.id);
        setResponse(filterMovies);
        dispatch(setUser({ ...user, likedMovies: filterMovies }));
      }
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };
  

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className='w-full h-full'>
      <HeroSection />
      <div className='flex flex-col'>
        <p className='text-white uppercase mb-4 text-2xl'>Liked Movies</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 p-8'>
          {response &&
            response.map((movie, index) => (
              <div className='relative' key={index}>
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt={`movie-${index}`}
                  className='w-full h-auto'
                />
                <span className=' absolute top-[-25px] right-0 text-5xl cursor-pointer text-white' onClick={()=>removeMovie(movie)}>x</span></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
