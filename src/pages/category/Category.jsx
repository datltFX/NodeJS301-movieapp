import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./category.css";

const Category = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // su kien click phim
  const handleClick = (movie) => {
    navigate(`/movie/${movie.id}`, {
      state: movie,
    });
  };

  //render
  return (
    <div className="category__container">
      <Navbar />
      <h2 className="title__category">Danh Sách Phim {state.type}</h2>
      <div>
        <div className="search__posters">
          {state.data.map((movie) => (
            <img
              className="search__posterLarge"
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : "https://wp.hrc.com.vn/wp-content/uploads/2020/12/winner-successful-concept_51195-3797-e1631452513463.png"
              }
              alt={movie.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
