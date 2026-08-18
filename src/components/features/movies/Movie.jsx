import { defaultPoster } from "../../../../config";

const Movie = ({ movies, onHandleSelectedId }) => {
  return (
    <>
      {movies?.map((movie) => (
        <li
          className="list list-watched"
          onClick={() => onHandleSelectedId(movie.imdbID)}
          key={movie.imdbID}>
          <img
            src={movie.Poster === "N/A" ? defaultPoster : movie.Poster}
            alt={`${movie.Title} poster`}
            // src={movie.Poster} alt={`${movie.Title} poster`}
            onError={(e) => {
              if (e.target.src !== defaultPoster) {
                e.target.src = defaultPoster;
              }
            }}
          />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </>
  );
};
export default Movie;
