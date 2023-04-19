import "./Detail.css";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import requests from "../../components/api/requests";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Detail = () => {
  //lay state tu location
  const { state } = useLocation();
  const params = useParams();
  const [isVideo, setIsVideo] = useState(false);

  //lay trailer
  const [keyVideo, setKeyVideo] = useState("");
  // console.log(keyVideo);

  useEffect(() => {
    //post request lay key
    const data = {
      movieId: Number(params.id),
    };
    axios
      .post(requests.fetchTrailer, data)
      .then((res) => {
        // alert("successs");
        // console.log(res.data);
        if (res.data.length === 0) {
          setIsVideo(false);
          setKeyVideo("");
        } else {
          setIsVideo(true);
          setKeyVideo(res.data[0].key);
        }
      })
      .catch((err) => {
        setIsVideo(false);
        setKeyVideo("");
      });
  }, [params]);

  function trunacate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const opts = {
    height: "600",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  //render
  return (
    <div className="detail__container">
      <Navbar />
      <div style={{ marginBottom: "200px" }}>
        <div
          className="detail__banner"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${state.backdrop_path}")`,
          }}
        >
          <div className="detail__banner__fadeBottom" />
        </div>
        <div className="movie-content">
          <div className="movie-content__poster">
            <div
              className="movie-content__poster__img"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${
                  state.poster_path || state.backdrop_path
                }")`,
              }}
            ></div>
          </div>
          <div className="movie-content__info">
            <h1 className="title">{state.title || state.name}</h1>
            <h4 className="overview">{trunacate(state.overview, 500)}</h4>
            <h4 className="overview">
              Release Date:{" "}
              {state.release_date ? state.release_date : state.first_air_date}
            </h4>
            <h4 className="overview">Popularity: {state.popularity}</h4>
            <h4 className="overview">Vote Average: {state.vote_average}</h4>
          </div>
        </div>
      </div>
      <div className="container">
        {isVideo ? (
          <YouTube videoId={keyVideo} opts={opts} />
        ) : (
          <div className="not_found_video">
            <h1>Not Found Movie!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
