import { useEffect } from "react";
export function useKeyPress(key, action) {
  useEffect(
    function () {
      // we need useEffect because we handle the DOM itself
      // in strict mode the effects running twice
      const callBack = function (event) {
        // console.log(event);
        if (event.code.toLowerCase() === key.toLowerCase()) {
          action();
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
    [action, key],
  );
}
