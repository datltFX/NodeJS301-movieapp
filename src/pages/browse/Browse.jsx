import React from "react";
import MovieList from "../../components/MovieList/MovieList";
import requests from "../../components/api/requests";
import "./Browse.css";
import Banner from "../../components/Banner/Banner";
import Navbar from "../../components/Navbar/Navbar";

const listApi = [
  {
    fetchUrl: `${requests.fetchNetflixOriginals}`,
    isLarge: "isLargePoster",
  },
  {
    title: "Xu hướng",
    fetchUrl: `${requests.fetchTrending}`,
  },
  {
    title: "Xếp hạng cao",
    fetchUrl: `${requests.fetchTopRated}`,
  },
  {
    title: "Hành động",
    fetchUrl: `${requests.fetchActionMovies}`,
  },
  {
    title: "Hài",
    fetchUrl: `${requests.fetchComedyMovies}`,
  },
  {
    title: "Kinh dị",
    fetchUrl: `${requests.fetchHorrorMovies}`,
  },
  {
    title: "Lãng mạn",
    fetchUrl: `${requests.fetchRomanceMovies}`,
  },
  {
    title: "Tài liệu",
    fetchUrl: `${requests.fetchDocumentaries}`,
  },
];

function Browse() {
  return (
    <div className="Browse">
      <Navbar />
      <Banner />
      {listApi.map((item, index) => (
        <MovieList
          key={index}
          title={item.title}
          fetchUrl={item.fetchUrl}
          isLargePoster={item.isLarge}
        />
      ))}
    </div>
  );
}

export default Browse;
