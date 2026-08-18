import { useState } from "react";
import SearchBar from "./components/layout/SearchBar";
import Box from "./components/ui/Box";

import MovieList from "./components/features/movies/MovieList";
import Logo from "./components/layout/Logo";
import Search from "./components/features/movies/Search";
import NumResult from "./components/layout/NumResult";
import MoviesSummary from "./components/features/watched/MoviesSummary";
import MoviesWatched from "./components/features/watched/MoviesWatched";
import Main from "./components/layout/Main";

import MovieDetails from "./components/features/movies/MovieDetails";
import { useMovies } from "./custom_hooks/useMovies";
import { useLocalStorageState } from "./custom_hooks/useLocalStorageState";
const App = () => {
  // const tempMovieData = [
  //   {
  //     imdbID: "tt1375666",
  //     Title: "Inception",
  //     Year: "2010",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  //   },
  //   {
  //     imdbID: "tt0133093",
  //     Title: "The Matrix",
  //     Year: "1999",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  //   },
  //   {
  //     imdbID: "tt6751668",
  //     Title: "Parasite",
  //     Year: "2019",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  //   },
  // ];

  // const tempWatchedData = [
  //   {
  //     imdbID: "tt1375666",
  //     Title: "Inception",
  //     Year: "2010",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  //     runtime: 148,
  //     imdbRating: 8.8,
  //     userRating: 10,
  //   },
  //   {
  //     imdbID: "tt0088763",
  //     Title: "Back to the Future",
  //     Year: "1985",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  //     runtime: 116,
  //     imdbRating: 8.5,
  //     userRating: 9,
  //   },
  // ];
  const [query, setQuery] = useState("");

  // const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  // using custom hook
  const [watched, setWatched] = useLocalStorageState([], "watched");

  //  const [watched, setWatched] = useState([]);
  // we can pass a callback function to the useState
  // const [watched, setWatched] = useState(function () {
  // this function must be pure function => never pass an arguments to it | it only executes when it initial render
  // when the state starts with some computations we need to pass a callback function
  // const storedData = localStorage.getItem("watched");
  // convert it from string into array
  // return JSON.parse(storedData);
  // });
  // YOU should not call it in use state like this it still call the value every render
  // never do this ===>  useState(localStorage.getItem("watched"))
  // ==============
  // const [isOpen2, setIsOpen2] = useState(true);

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runTime));

  const handleSelectedId = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseSelectedMovie = () => {
    setSelectedId(null);
  };
  const handleAddWatchedMovie = (movie) => {
    setWatched((watched) => [...watched, movie]);
    /*
    storing watched movie in the localstorage
    1- store it when it actually added => in this event handler function
    2- do it in the effect ==> better for reusability
    */
    //  we want the new watched after updating process and as we know the update state is an async process so we need to prevent it from staling and we need to convert it to string
    //   localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  };
  // console.log(watched);
  // console.log(selectedId);
  const handleDeleteWatched = (id) => {
    //  if the same id the movie will filtered out (will be deleted)
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  // useEffect(
  //   function () {
  //     // this effect will run after the watched have been updated
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched],
  // );

  const { movies } = useMovies(query);
  return (
    <div>
      {/* Prop Drilling => pass props into children to reach the components that need that props  it is not the best solution if u have many children  | the possible solution is component composition*/}
      <SearchBar>
        <Logo />
        <Search query={query} onSetQuery={setQuery} />
        <NumResult movies={movies} />
      </SearchBar>

      <Main>
        {/* component composition implicit passing component  */}
        {/*  using children props is a preffered way */}
        <Box>
          <MovieList
            watched={watched}
            onSetWatched={setWatched}
            query={query}
            onHandleSelectedId={handleSelectedId}
            onHandleCloseSelectedMovie={handleCloseSelectedMovie}
          />
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onHandleCloseSelectedMovie={handleCloseSelectedMovie}
              onHandleAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <MoviesSummary
                watched={watched}
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
              />
              <MoviesWatched
                watched={watched}
                onHandleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>

        {/* passing explicity props as element it exist on some library like react router */}
        {/* <Box
          element={<MovieList movies={movies} watched={watched} />}
        />
        <Box
          element={
            <>
              {/* we return a 2 JSX values so we need the react fragment */}
        {/* <MoviesSummary
                watched={watched}
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
              />

              <MoviesWatched watched={watched} />
            </>
          }
        // /> */}
      </Main>
    </div>
  );
};
export default App;
