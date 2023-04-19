import { useState, useEffect } from "react";
import "./ResultList.css";
import { useNavigate } from "react-router-dom";

const ResultList = ({ results }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  //luu result
  useEffect(() => {
    setData(results);
  }, [results]);

  // su kien click phim
  const handleClick = (movie) => {
    navigate(`/movie/${movie.id}`, {
      state: movie,
    });
  };

  //render
  return (
    <div>
      {data.length > 0 ? (
        <div className="search__result">
          <h2>Search Result</h2>
          <div className="search__posters">
            {data.map((movie) => (
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
      ) : (
        <div className="not_found_movie">
          <h1>Not Found Movie!</h1>
        </div>
      )}
    </div>
  );
};
export default ResultList;
