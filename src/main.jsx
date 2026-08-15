import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import StarRating from "./components/StarRating";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* 
    <StarRating
      maxRating={10}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    /> */}
    {/* <StarRating maxRating={5} />
    <StarRating /> */}
    {/* <StarRating color="red" size={30} className={"test"} defaultRating={3} /> */}
  </StrictMode>,
);
