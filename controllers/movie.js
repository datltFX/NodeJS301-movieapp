const GenreList = require("../models/genreList");
const MoviesList = require("../models/moviesList");
const Videolist = require("../models/videoList");

//maximum data on page
const limitOfPage = 20;

//get trending movies
exports.getTrendingMovies = (req, res, next) => {
  MoviesList.fetchAll((movies) => {
    const page = req.query.page || 1;
    // console.log(movies);
    //sort moviesList arr
    movies.sort((a, b) => b.popularity - a.popularity);
    // console.log(movies);
    //send data
    res.status(200).send({
      results: movies.slice((page - 1) * limitOfPage, page * limitOfPage),
      page: page,
      total_pages: Math.ceil(movies.length / limitOfPage),
    });
  });
};

//get top rating movies
exports.getTopRatingMovies = (req, res, next) => {
  MoviesList.fetchAll((movies) => {
    const page = req.query.page || 1;
    // console.log(movies);
    //sort moviesList arr
    movies.sort((a, b) => b.vote_average - a.vote_average);
    // console.log(movies);
    //send data
    res.status(200).send({
      results: movies.slice((page - 1) * limitOfPage, page * limitOfPage),
      page: page,
      total_pages: Math.ceil(movies.length / limitOfPage),
    });
  });
};

//get genre movies
exports.getGenreMovies = (req, res, next) => {
  if (req.params.genreId === undefined) {
    res.status(400).send("Not found genre param");
  } else {
    const genreId = +req.params.genreId;
    const page = req.query.page || 1;
    MoviesList.fetchAll((movies) => {
      //loc phim co chua genreId
      const moviesGenre = movies.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
      if (moviesGenre.length === 0) {
        res.status(400).send("Not found that genre id");
      } else {
        GenreList.fetchAll((genreList) => {
          //get genre movie
          const genre_name = genreList.find(
            (genre) => genre.id === genreId
          ).name;
          // console.log(genre_name);
          //send data
          res.status(200).send({
            results: moviesGenre.slice(
              (page - 1) * limitOfPage,
              page * limitOfPage
            ),
            page: page,
            total_pages: Math.ceil(moviesGenre.length / limitOfPage),
            genre_name: genre_name,
          });
        });
      }
    });
  }
};

//get trailer movie
exports.getTrailerMovie = (req, res, next) => {
  // console.log(req.body.movieId);
  if (req.body.movieId === undefined) {
    res.status(400).send("Not found film_id param");
  } else {
    const movieId = +req.body.movieId;
    let videoTrailer = [];
    Videolist.fetchAll((videoList) => {
      //loc videos trung id
      const videosOfMovie = videoList.filter((movie) => movie.id === movieId);
      // console.log(videosOfMovie);
      if (videosOfMovie.length === 0) {
        res.status(404).send("not found video");
      } else {
        //loc video co dia chi youtube -teaser+trailer
        const videos = videosOfMovie[0].videos.filter(
          (video) =>
            video.official &&
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser")
        );
        //loc video trailer
        const trailer = videos.filter((video) => video.type === "Trailer");
        // console.log(trailer);
        if (trailer.length > 0) {
          videoTrailer = trailer;
        } else {
          videoTrailer = videos;
        }
        //sort video following published_at
        videoTrailer.sort((a, b) => {
          return new Date(a.published_at) - new Date(b.published_at);
        });
        // console.log(videoTrailer);
        res.status(200).send(videoTrailer);
      }
    });
  }
};

//get search movie
// exports.getSearchMovie = (req, res, next) => {
//   console.log(req.body);
//   if (req.body.query === undefined || req.body.query === "") {
//     res.status(400).send("Not found keyword param");
//   } else {
//     const keyword = req.body.query.toLowerCase();
//     const page = req.query.page || 1;
//     MoviesList.fetchAll((movieList) => {
//       //loc phim thoa man dk
//       const searchMovies = movieList.filter(
//         (movie) =>
//           movie.title?.toLowerCase().includes(keyword) ||
//           movie.overview?.toLowerCase().includes(keyword)
//       );
//       // console.log(searchMovies);
//       if (searchMovies.length === 0) {
//         res.status(400).send("Not found this keyword!");
//       } else {
//         res.status(200).send({
//           results: searchMovies.slice(
//             (page - 1) * limitOfPage,
//             page * limitOfPage
//           ),
//           page: page,
//           total_pages: Math.ceil(searchMovies.length / limitOfPage),
//         });
//       }
//     });
//   }
// };

//get Search movie with genre+media+langue
exports.getSearchMovie = (req, res, next) => {
  const { query, genre, type, language, year } = req.body;
  // console.log(query, genre, type, language, year);
  if (query === undefined || query === "") {
    res.status(400).send("Not found keyword param");
  } else {
    const keyword = query.toLowerCase();
    const page = req.query.page || 1;
    MoviesList.fetchAll((movieList) => {
      //loc phim thoa man dk
      const searchMovies = movieList
        .filter(
          (movie) =>
            movie.title?.toLowerCase().includes(keyword) ||
            movie.name?.toLowerCase().includes(keyword) ||
            movie.overview?.toLowerCase().includes(keyword)
        )
        .filter(
          (movie) => genre === "" || movie.genre_ids?.includes(Number(genre))
        )
        .filter((movie) => type === "" || movie.media_type === type)
        .filter(
          (movie) =>
            language === "" || movie.original_language?.includes(language)
        )
        .filter(
          (movie) =>
            year === "" ||
            new Date(movie.release_date).getFullYear() === Number(year)
        );

      // console.log(searchMovies);
      if (searchMovies.length === 0) {
        res.status(400).send("Not found this keyword!");
      } else {
        res.status(200).send({
          results: searchMovies.slice(
            (page - 1) * limitOfPage,
            page * limitOfPage
          ),
          page: page,
          total_pages: Math.ceil(searchMovies.length / limitOfPage),
        });
      }
    });
  }
};
