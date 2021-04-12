import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./nfPage.css";

const nfPage = () => {
  return (
    <div>
        <h4 className='header-title'>Error Code 404 Page you Looking for is not available</h4>
      <div className="cl-404">
        <Image
          src="http://clipart-library.com/new_gallery/118673_scared-face-png.png"
          alt="404 Page Not Found"
        />
        <Link className='links-404' to='/'>Take Me Home Pleasss!!!!!</Link>
      </div>
    </div>
  );
};

export default nfPage;
