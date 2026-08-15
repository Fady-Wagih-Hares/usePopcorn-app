import { useState } from "react";
const Box = ({
  // element
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {
        isOpen && children

        // element
      }
    </div>
  );
};
export default Box;
