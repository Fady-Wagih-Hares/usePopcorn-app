//  js will generate it just 1 time
import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";
const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};
const starContainerStyle = {
  display: "flex",
  gap: "2px",
};

const StarRating = ({
  // setting default props in react app
  // props is only accessible inside the component
  maxRating = 5,
  // it is really important to give a default values
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) => {
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
    color,
  };
  // we use this prop as seed data in this case in general do not use props to initial the use state value | and it is no problem to initialize your useState with props
  const [rating, setRating] = useState(defaultRating);
  // state for temporary rating
  const [tempRating, setTempRating] = useState(0);
  const handleRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            fullStar={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

//  use TypeScript instead of javaScript
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
};

export default StarRating;
