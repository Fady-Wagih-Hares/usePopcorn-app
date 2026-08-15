const MoviesWatched = ({ watched, onHandleDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runTime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => onHandleDeleteWatched(movie.imdbID)}>
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default MoviesWatched;
