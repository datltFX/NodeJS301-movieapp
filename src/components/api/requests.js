const API_KEY = "3d39d6bfe362592e6aa293f01fbcf9b9";
const user_token = "8qlOkxz4wq";
const baseURL = "https://movieapp-server.onrender.com";
// const baseURL = "http://localhost:5500";

const requests = {
  fetchTrending: `${baseURL}/api/movies/trending/${user_token}`,
  fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `${baseURL}/api/movies/top-rate/${user_token}`,
  fetchActionMovies: `${baseURL}/api/movies/discover/28/${user_token}`,
  fetchComedyMovies: `${baseURL}/api/movies/discover/35/${user_token}`,
  fetchHorrorMovies: `${baseURL}/api/movies/discover/27/${user_token}`,
  fetchRomanceMovies: `${baseURL}/api/movies/discover/10749/${user_token}`,
  fetchDocumentaries: `${baseURL}/api/movies/discover/99/${user_token}`,
  fetchSearch: `${baseURL}/api/movies/search/${user_token}`,
  fetchTrailer: `${baseURL}/api/movies/video/${user_token}`,
  fetchGenres: `${baseURL}/api/movies/genres/${user_token}`,
  fetchMediaType: `${baseURL}/api/movies/media-types/${user_token}`,
};

export default requests;
