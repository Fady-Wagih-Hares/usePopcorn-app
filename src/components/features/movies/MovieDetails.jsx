import { useEffect, useRef, useState } from "react";
import StarRating from "../../ui/StarRating";
import Loader from "../../ui/Loader";
import { useKeyPress } from "../../../custom_hooks/useKeyPress";
const MovieDetails = ({
  selectedId,
  onHandleCloseSelectedMovie,
  onHandleAddWatchedMovie,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  // we can not mutate the ref in render logic
  //  we do not use ref to render any thing in UI
  const countRef = useRef(0);
  // const [avgRating, setAvgRating] = useState(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  // console.log(isWatched);
  /*
  Using custom hooks
  1- if we need to reuse some logical part => non visual
  2- want to extract a huge part of our component out into custom
  */
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
  // making big problems
  // ===================
  //  it is not allowed to call hooks conditionally so you must call it in the top level
  // when we broken the rules the application stop working and the order of linked list of hooks will be changes
  // if (imdbRating > 8) {
  //   const [isTop, setIsTop] = useState(true);
  // }
  //  early returning | render fewer hooks => big problem
  // if (imdbRating > 8) return <p>Greatest ever!</p>;
  // ======================
  // here react looks to the initial state in the mount render in the first  mount the imdb still undefined | it stay false forever
  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);
  // //  solution => useEffect
  // useEffect(
  //   function () {
  //     // it will be true in the end
  //     setIsTop(imdbRating > 8);
  //   },
  //   [imdbRating],
  // );
  // the same one and the better => using derived state
  // this variable will be generated each time the component get rerender
  // note that updating states is a asynchronous process
  // const isTop = imdbRating > 8;
  // console.log(isTop);
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
      countRatingDecisions: countRef.current,
    };
    onHandleAddWatchedMovie(newWatchedMovie);
    onHandleCloseSelectedMovie();
    // setAvgRating(Number(imdbRating));
    // alert(avgRating);
    // the avgRating still at 0 point because he set state is an async process => the avgRating is stale at this point ====> the solution is by passing in callback function
    // setAvgRating((avgRating + userRating) / 2);
    // setAvgRating((avgRating) => (avgRating + userRating) / 2);
    // ===============
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
  // useEffect(
  //   function () {
  //     // we need useEffect because we handle the DOM itself
  //     // in strict mode the effects running twice
  //     const callBack = function (event) {
  //       // console.log(event);
  //       if (event.code === "Escape") {
  //         onHandleCloseSelectedMovie();
  //         // every new component mounts a new event listener is add to the document
  //         // console.log("Closing");
  //       }
  //     };
  //     document.addEventListener("keydown", callBack);
  //     return function () {
  //       //  we need to clean up the eventListeners
  //       //  it must be the same function that we need to remove
  //       //  the event Listener only executes one time
  //       document.removeEventListener("keydown", callBack);
  //     };
  //   },
  //   [onHandleCloseSelectedMovie],
  // );
  // using custom hook
  useKeyPress("Escape", onHandleCloseSelectedMovie);

  // useEffect for useRef
  useEffect(
    function () {
      if (!userRating) return;
      countRef.current = countRef.current + 1;
    },
    [userRating],
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
          {/* <p>{avgRating}</p> */}
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
