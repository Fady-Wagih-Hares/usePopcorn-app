// import { useEffect } from "react";
// import Swal from "sweetalert2";

const ErrorMessage = ({ message }) => {
  //   useEffect(
  //     function () {
  //       if (message)
  //         //  sweet alert in an async function so it have side effects
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: message,

  //           footer: '<a href="#">Why do I have this issue?</a>',
  //         });
  //     },
  //     [message],
  //   );
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
  );
};
export default ErrorMessage;
