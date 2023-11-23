import React from "react";
import { Link } from "react-router-dom";
import "./ImageLink.css";

const ImageLink = (props) => (
  <div className={`${props.formName}-image`}>
    <figure>
      <img src={props.imageUrl} alt="Placeholder" />
    </figure>
    <Link to={props.anchorUrl} className="signup-image-link">
      {props.anchorText}
    </Link>
  </div>
);

export default ImageLink;