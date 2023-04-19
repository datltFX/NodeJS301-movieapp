import React, { useState, useEffect } from "react";
import "./MovieList.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const MovieList = ({ title, fetchUrl, isLargePoster }) => {
  const navigate = useNavigate();
  //luu mang phim tu api
  const [movies, setMovies] = useState([]);
  //lấy phim từ API
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // console.log(request.data.results);
      return request;
    };
    //goi api
    fetchData();
  }, [fetchUrl]);

  // su kien click phim
  const handleClick = (movie) => {
    navigate(`/movie/${movie.id}`, {
      state: movie,
    });
  };

  //go to view more
  const moreHandler = (type) => {
    navigate(`/movie/category/${title.trim()}`, {
      state: { type: title, data: movies },
    });
  };

  //render
  return (
    <div className="movieContainer">
      <div className="movie__category">
        <h5>{title}</h5>
        {title && (
          <span>
            <button className="btn-outline" onClick={moreHandler}>
              View more
            </button>
          </span>
        )}
      </div>

      <div className="movie__posters">
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"7"}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`movie__poster ${
                  isLargePoster && "movie__posterLarge"
                }`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargePoster ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieList;
