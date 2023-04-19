import React from "react";
import { useState } from "react";
import "./Banner.css";
import axios from "axios";
import { useEffect } from "react";
import requests from "../api/requests";
import { useNavigate } from "react-router-dom";
import Modals from "../modal/Modals";

const Banner = () => {
  const navigate = useNavigate();
  //state save movie
  const [movie, setMovie] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [keyVideo, setKeyVideo] = useState("");

  //Hook useEffect thuc hien lenh requests API
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    //goi api
    fetchData();
  }, []);

  //lay trailer
  useEffect(() => {
    //post request lay key
    const data = {
      movieId: Number(movie.id),
    };
    axios
      .post(requests.fetchTrailer, data)
      .then((res) => {
        if (res.data.length === 0) {
          setKeyVideo("");
        } else {
          setKeyVideo(res.data[0].key);
        }
      })
      .catch((err) => {
        setKeyVideo("");
      });
  }, [movie]);

  //toggle modal
  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  function trunacate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  //watch detail
  const watchHandler = () => {
    navigate(`/movie/${movie.id}`, {
      state: movie,
    });
  };

  //render
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__contents">
        {/* tieu de */}
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        {/* hien thi nut */}
        <div className="">
          <button className="banner__button" onClick={watchHandler}>
            Watch now
          </button>
          <button className="banner__button" onClick={() => setIsOpen(true)}>
            Watch trailer
          </button>
        </div>
        {/* mo ta */}
        <h1 className="banner__description">
          {trunacate(movie.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
      {<Modals isOpen={isOpen} hide={toggle} isKey={keyVideo} />}
    </header>
  );
};

export default Banner;
