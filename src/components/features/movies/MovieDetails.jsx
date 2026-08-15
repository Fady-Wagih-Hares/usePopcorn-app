import { useEffect, useState } from "react";
import StarRating from "../../ui/StarRating";
import Loader from "../../ui/Loader";
const MovieDetails = ({
  selectedId,
  onHandleCloseSelectedMovie,
  onHandleAddWatchedMovie,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  // console.log(isWatched);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;
  // console.log(watchedUserRating);
  //   destructure the data
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runTime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  // console.log(title, year, imdbRating);
  const KEY = import.meta.env.VITE_API_KEY;
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const result = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}
             `,
        );
        const data = await result.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    // dependency array like event listener that listen for change and whenever changes the data fetching is do again
    [selectedId],
  );
  const handleAdd = () => {
    // we need the new movie object as an input

    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runTime: Number(runTime.split(" ").at(0)),
      userRating,
    };
    onHandleAddWatchedMovie(newWatchedMovie);
    onHandleCloseSelectedMovie();
  };

  // change the title of the page => always use different effect for different thins | this effect will run on mount
  useEffect(() => {
    if (!title) return;
    document.title = `Movie: ${title}`;
    // clean up function it returns from effect => it runs when only after the component  unmounted
    //  this function remember the title because of the feature in js called => (closure => function will always remember all the variables at the time & place that the function will created in this case it creates when the effect runs so it remember the title )
    //  the clean up function runs between renderers => (after each rerender)
    return function () {
      //  return the title to the original one after component its destroyed
      document.title = "usePopcorn";
      // console.log(`Clean Up Effect For Movie: ${title} `);
    };
  }, [title]);
  useEffect(
    function () {
      // we need useEffect because we handle the DOM itself
      // in strict mode the effects running twice
      const callBack = function (event) {
        // console.log(event);
        if (event.code === "Escape") {
          onHandleCloseSelectedMovie();
          // every new component mounts a new event listener is add to the document
          // console.log("Closing");
        }
      };
      document.addEventListener("keydown", callBack);
      return function () {
        //  we need to clean up the eventListeners
        //  it must be the same function that we need to remove
        //  the event Listener only executes one time
        document.removeEventListener("keydown", callBack);
      };
    },
    [onHandleCloseSelectedMovie],
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onHandleCloseSelectedMovie}>
              &larr;
            </button>
            {/* {selectedId} */}
            <img src={poster} alt={`Poster Of The ${movie} Movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runTime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You Have Rated This Movie Already with {watchedUserRating}{" "}
                  <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add To List
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
};
export default MovieDetails;
