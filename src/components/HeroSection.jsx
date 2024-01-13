import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopular } from '../slices/movieSlice';
import { fetchPopular } from '../services/operations/movieFetchApi';
import IconBtn from './IconBtn';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const HeroSection = () => {
  const [randomMovie, setRandomMovie] = useState("");
  const { popular } = useSelector((state) => state.movie);
  const [movieKey, setMovieKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const fetchPopularMovie = async () => {
    const res = await fetchPopular();
    dispatch(setPopular(res));
  };

  const randomMovies = () => {
    if (popular && popular.length > 0) {
      const length = popular.length;
      let randomNum = Math.floor(Math.random() * length);
      setRandomMovie(popular[randomNum]);
    }
  };

  useEffect(() => {
    fetchPopularMovie();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    randomMovies();
  }, [popular]);

  const playTrailer = async (title) => {
    const key = await movieTrailer(title);
    const searchParams = new URLSearchParams(new URL(key).search);
    setMovieKey(searchParams.get('v'));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setMovieKey(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='w-full h-[600px] top-[-100px] lg:h-[850px] relative z-10 lg:top-[-114px]'>
        <img src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`} alt="" className='h-full w-full object-cover object-center' />
        {randomMovie &&
          <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-1/3 p-6 text-white md:w-full lg:w-1/4'>
            <h1 className='text-5xl font-bold mb-6'>{randomMovie?.title}</h1>
            <IconBtn text="Play Trailer" customClasses="mb-4" onClick={() => playTrailer(randomMovie?.title)} />
            <p className='text-md font-light opacity-70'>{randomMovie?.release_date}</p>
            <p className='hidden md:block mt-2 text-sm opacity-80'>{randomMovie?.overview}</p>
          </div>
        }
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="relative max-w-3xl w-full">
              <span className="absolute top-2 right-2 m-4 text-white text-3xl cursor-pointer" onClick={closeModal}>&times;</span>
              <YouTube videoId={movieKey}
                opts={{
                  width: '100%',
                  height: '600px',
                  playerVars: {
                    autoplay: 1,
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeroSection;
