import React from "react";

const MiddleLineText = ({text}) => {
  return (
    <div className="middle-line-text bold">
        <div className="line"></div>
        <div className="ml-4 mr-4">{text}</div>
        <div className="line"></div>
    </div>
  );
};
export default MiddleLineText;
