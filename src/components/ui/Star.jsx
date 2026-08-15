import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Star = ({ fullStar, onRate, onHoverIn, onHoverOut, color, size }) => {
  const starStyle = {
    cursor: "pointer",
    height: `${size}px`,
    width: `${size}px`,
    display: "block",
    // fontSize: "1.8rem",
    fontSize: `${size / 1.5}px`,
    color,
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}>
      {fullStar ? <FaStar /> : <CiStar />}
    </span>
  );
};
export default Star;
