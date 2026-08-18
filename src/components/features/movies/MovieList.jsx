import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";
import Movie from "./Movie";

import { useCallback } from "react";
import { useMovies } from "./../../../custom_hooks/useMovies";

const MovieList = ({
  query,
  onHandleSelectedId,
  onHandleCloseSelectedMovie,
}) => {
  //  render logic phase (mount)
  // get the data by destructing
  const callback = useCallback(function () {
    onHandleCloseSelectedMovie();
  }, []);
  const { movies, isLoading, errorMessage } = useMovies(query, callback);
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
