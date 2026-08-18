import { useRef } from "react";
import { useKeyPress } from "../../../custom_hooks/useKeyPress";

const Search = ({ query, onSetQuery }) => {
  // How not to select react element
  // useEffect(function () {
  // react is all about being declarative => this way do not be belong to react 's philosophy (do not select dom or add event Listeners manually) | solution => useRef Hook
  //   const element = document.querySelector(".search");
  //   console.log(element);
  //   element.focus();
  // }, []);

  // using useRef =>
  /*
    1- create ref => pass a value if it with DOM it usually be null it return a ref
    2- pass ref property to the target that we need to make ref it will be connected with declarative way no need to select and manipulate or query selection the DOM tree
    3- use again useEffect Hook
  */
  //  the ref is runs after the DOM is loaded so we need useEffect
  const inputElement = useRef(null);
  // // console.log(inputElement);
  // // select search bar feature
  // useEffect(
  //   function () {
  //     // current property is the box that we store a ref to it
  //     // console.log(inputElement.current);

  //     const callBack = (event) => {
  //       if (document.activeElement === inputElement.current) return;
  //       if (event.code === "Enter") {
  //         inputElement.current.focus();
  //         onSetQuery("");
  //       }
  //     };
  //     document.addEventListener("keydown", callBack);
  //     return () => document.addEventListener("keydown", callBack);
  //   },
  //   [onSetQuery],
  // );
  // using custom hook
  useKeyPress("Enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    onSetQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputElement}
    />
  );
};
export default Search;
