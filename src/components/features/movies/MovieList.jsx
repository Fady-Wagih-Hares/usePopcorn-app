import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";
import Movie from "./Movie";

const MovieList = ({
  movies,
  onSetMovies,
  onSetWatched,
  onSetQuery,
  query,
  onHandleSelectedId,
  onHandleCloseSelectedMovie,
}) => {
  //  render logic phase (mount)
  // state loading
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const KEY = import.meta.env.VITE_API_KEY;
  // trying effects
  // synchronize with no variable at all
  /*
  useEffect(function () {
    console.log("After Initial Render ");
  }, []);
  // this effect will synchronize with every thing => because it does not have a dependency array [] that is render of everything that changed in the component (every render)
  useEffect(function () {
    console.log("After Every Render");
  });

  //  it run during render and effects run after render
  console.log("During Render");
  //  when query variable has changed this effect will run
  useEffect(
    function () {
      console.log("D");
    },
    [query],
  );
  */
  //  data fetching in render logic it cause a side effect => it interaction with outside world which should never be allowed in the render logic
  //  it is running an infinite number of requests
  //  do not set state update in render logic it not allowed
  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar
  // `)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.Search));
  // too many renders ==> infinite loop so do not update the state in the top level
  // onSetWatched([]);

  //  solution with useEffect hook
  // not store in any variable it is does return anything u just pass a function (our effect it is contain the code that we want to run as a side effect , second argument that call dependency array)
  //  the effect will only run in mount
  //  no more infinite loops
  useEffect(
    function () {
      // convert it to async
      // using a browser api => abort controller to cleaning up data fetching
      // 1. create abort controller
      // 2. make an object in the fetch method as a second argument =>  { signal: controller.signal }
      // 3. in clean up function =>  return function(){
      //   controller.abort()
      // }
      // const controller = new AbortController(); // browser API it notion to do with react but it do with  the browser itself
      const controller = new AbortController();
      const fetchMovie = async function () {
        try {
          setIsLoading(true);
          // always reset error before fetching data
          setErrorMessage("");
          const result = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}
             `,
            { signal: controller.signal },
          );
          //  Handling errors
          if (!result.ok) throw new Error("Someting Went Wrong!");
          const data = await result.json();
          if (data.Response === "False") throw new Error("Movie Not Found!");
          // setting state is asynchronous
          onSetMovies(data.Search);
          //  strict mode in react 18 will call that effects twice on development phase only
          // console.log(data.Search);
          //  stale state => old one
          // console.log(movies);
          // .then((res) => res.json())
          // .then((data) => onSetMovies(data.Search));
          setErrorMessage("");
          setIsLoading(false);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.log(error.message);
            setErrorMessage(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      };
      // 5. Only fetch if the query is at least 3 characters long to avoid OMDB errors
      if (query.length < 3) {
        onSetMovies([]);
        setErrorMessage("");
        return;
      }
      onHandleCloseSelectedMovie();
      fetchMovie();
      // Cleanup function to cancel the fetch when the query changes (user types a new letter)
      // runs between rerenders we cancel the current request each time  the new one comes in
      // when the request get canceled the js see it as an error
      return function () {
        controller.abort();
      };
    },
    [query, KEY, onSetMovies],
  );
  return (
    // isLoading ? (
    //   <Loader />
    // ) : (
    //   <>
    //     <ul className="list list-watched">
    //       {movies?.map((movie) => (
    //         <li key={movie.imdbID}>
    //           <img src={movie.Poster} alt={`${movie.Title} poster`} />
    //           <h3>{movie.Title}</h3>
    //           <div>
    //             <p>
    //               <span>🗓</span>
    //               <span>{movie.Year}</span>
    //             </p>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </>
    // );
    <ul className="list list-movies">
      {/* three mutually exclusive conditions */}
      {isLoading && <Loader />}
      {!isLoading && !errorMessage && (
        <Movie movies={movies} onHandleSelectedId={onHandleSelectedId} />
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </ul>
  );
};
export default MovieList;
