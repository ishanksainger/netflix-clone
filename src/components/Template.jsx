import React, { useEffect, useState } from 'react';
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { useDispatch, useSelector } from 'react-redux';
import { userLikedMovies } from '../services/operations/profileApi';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import IconBtn from './IconBtn';

const Template = ({ movieType, movie }) => {
  const [movieTypes, setMovieTypes] = useState([]);
  const [heartColors, setHeartColors] = useState([]);
  const [isTrailerOpen, setIsTrailerOpen] = useState(Array(movie.length).fill(false));
  const [movieKey, setMovieKey] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()


  useEffect(() => {
    setMovieTypes(movie);
    setHeartColors(Array(movie.length).fill(false));
  }, [movie]);

  useEffect(() => {
    if (user && user.likedMovies) {
      // Update heartColors based on user's liked movies
      const newHeartColors = movieTypes.map((item) => {
        const isLiked = user.likedMovies.some((likedMovie) => likedMovie.id === item.id);
        return isLiked;
      });

      setHeartColors(newHeartColors);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [user?.likedMovies, movieTypes]);

  useEffect(() => {
    if (!user) {
      // Reset likedMovies when the user logs out
      setHeartColors(Array(movie.length).fill(false));
    }
  }, [user, movie]);

  const filteredMovieTypes = movieTypes.filter(item => item?.poster_path !== null);

  const playTrailer = async (index) => {
    try {
      const key = await movieTrailer(filteredMovieTypes[index]?.title);
      const updatedIsTrailerOpen = isTrailerOpen.map((isOpen, i) => (i === index ? !isOpen : false));
      setIsTrailerOpen(updatedIsTrailerOpen);
      extractVideoKey(key);
    } catch (error) {
      console.error('Error fetching YouTube video key:', error);
    }
  };

  const extractVideoKey = (url) => {
    const searchParams = new URLSearchParams(new URL(url).search);
    setMovieKey(searchParams.get('v'));
  };

  const changeColor = (index) => {
    if (token === null) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add To Cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })
    }
    else {
      const updatedHeartColors = [...heartColors];
      updatedHeartColors[index] = !updatedHeartColors[index];
      setHeartColors(updatedHeartColors);
      const updatedLikeMovies = [...user.likedMovies];
      if (heartColors[index]) {
        const movieIndex = updatedLikeMovies.findIndex((movie) => movie.id === filteredMovieTypes[index].id)
        updatedLikeMovies.splice(movieIndex, 1);
      }
      else {
        updatedLikeMovies.push(filteredMovieTypes[index]);
      }

      dispatch(userLikedMovies(token, updatedLikeMovies, filteredMovieTypes[index].id))
    }
  }
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <div className='mb-16'>
        <h1 className=' text-white uppercase mb-4 text-2xl'>{movieType}</h1>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 10,
              spaceBetween: 50,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          className="w-full"
        >
          {movieTypes.length > 0 && filteredMovieTypes.map((item, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide md:!w-60 md:max-h-48 overflow-hidden relative transition-all duration-500 ease-in-out cursor-pointer group" onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dark transparent overlay */}
              <div
                className="absolute inset-0 bg-black opacity-0"
                style={{
                  transition: 'opacity 0.3s, transform 0.3s',
                  opacity: hoveredIndex === index ? 0.5 : 0,
                  transform: `scaleY(${hoveredIndex === index ? 1 : 0})`,
                  transformOrigin: 'up',
                }}
              ></div>
              {/* Movie poster */}
              <img src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`} alt="" onClick={() => playTrailer(index)} />
              <div className={` font-bold absolute inset-0 flex items-center justify-center pointer-events-none ${hoveredIndex === index ? 'block' : 'hidden'}`}>
                <span className='grid place-items-center text-white'>{item.title}</span>
              </div>
              {/* Heart icon */}
              <div className={` absolute z-50 text-white top-0 text-xl ${heartColors[index] ? '' : 'hidden group-hover:block'}`} onClick={() => changeColor(index)}>
                {heartColors[index] ? <FaHeart className=' text-red-600' /> : <LuHeart />}
              </div>
              {/* Trailer button */}
              <div className={`absolute z-50 bottom-1 left-1/2 transform -translate-x-1/2 text-white text-nowrap text-xl ${hoveredIndex === index ? 'block' : 'hidden'}`}>
                <IconBtn onClick={() => playTrailer(index)} text="Watch Trailer" customClasses=" pr-8 pl-8 pt-1 pb-2" />
              </div>
            </SwiperSlide>

          ))}
          <div className="custom-swiper-navigation">
            <FaCircleArrowLeft className="swiper-button-prev" />
            <FaCircleArrowRight className="swiper-button-next text-white" />
          </div>
        </Swiper>
      </div>
      {isTrailerOpen.some(open => open) && movieKey &&
        <YouTube videoId={movieKey}
          opts={{
            height: '700px',
            width: '60%',
            playerVars: {
              autoplay: 1,
            },
          }}
          className={` ${isTrailerOpen.some(open => open) ? 'block' : 'hidden'} flex justify-center items-center`}
        />}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Template;
