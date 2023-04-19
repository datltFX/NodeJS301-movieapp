import "./SearchForm.css";
import ResultList from "../ResultList/ResultList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import requests from "../api/requests";

const SearchForm = () => {
  const [genres, setGenres] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [show, setShow] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);

  // lay data genre,mediaType
  useEffect(() => {
    axios.get(requests.fetchGenres).then((res) => {
      // console.log(res.data);
      setGenres(res.data);
    });
    axios.get(requests.fetchMediaType).then((res) => {
      // console.log(res.data);
      setMediaTypes(res.data);
    });
  }, []);

  //su kien btnSearch
  const handleSearch = (e) => {
    setShow(true);

    const data = {
      query: searchInput,
      genre: searchGenre,
      type: searchType,
      language: searchLanguage,
      year: searchYear,
    };
    // console.log(data);
    //post
    axios.post(requests.fetchSearch, data).then((res) => {
      // console.log(res.data);
      setResultSearch(res.data.results);
    });
  };

  //su kien reset
  const handleReset = (e) => {
    e.preventDefault();
    setShow(false);
    setResultSearch([]);
    setSearchInput("");
    setSearchGenre("");
    setSearchType("");
    setSearchLanguage("");
    setSearchYear("");
  };

  //render
  return (
    <div>
      <div className="search__form">
        <h2 className="title__search">Search Movie</h2>
        <div className="search">
          <div className="form">
            <div className="form--item name">
              <h5>Movie Name</h5>
              <input
                type="text"
                // className="inputValue__Search"
                placeholder="Enter keyword"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </div>
            {/* ----------------------------option -------------------------------*/}

            <div className="form--item select">
              <h5>Discover</h5>
              <select
                name="genres"
                id="genres"
                value={searchGenre}
                onChange={(e) => {
                  setSearchGenre(e.target.value);
                }}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option value={genre.id} key={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form--item select">
              <h5>Media Type</h5>
              <select
                name="mediaType"
                id="mediaType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="">All Type</option>
                {mediaTypes.map((type, i) => (
                  <option value={type} key={i}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form--item select">
              <h5>Language</h5>
              <select
                name="language"
                id="language"
                value={searchLanguage}
                onChange={(e) => {
                  setSearchLanguage(e.target.value);
                }}
              >
                <option value="">All Language</option>
                <option value="en">UK/US</option>
                <option value="ja">Japan</option>
                <option value="ko">Korea</option>
              </select>
            </div>
            <div className="form--item year">
              <h5>Release year</h5>
              <input
                // className="inputYear"
                type="year"
                min="1900"
                max="2030"
                name="year"
                id="year"
                placeholder="year"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
              />
            </div>
          </div>
          <div className="btn_search">
            <button className="btnReset" onClick={handleReset}>
              Reset
            </button>
            <button className="btnSearch" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      {show && <ResultList results={resultSearch} />}
    </div>
  );
};

export default SearchForm;
