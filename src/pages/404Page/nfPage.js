import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from "././images/404.jpg";
import "./nfPage.css";

const NfPage = () => {
  return (
    <>
      <div className="cl-404">
        <Image src={image} alt="404 Page Not Found" />
        <Link
          className="links-404"
          to="/"
          onClick={() => {
            document.querySelector("#main-cont").className = "container";
            document.querySelector("footer").style.marginTop = "6rem";
          }}
        >
          Take Me Home Pleasss!!!!!
        </Link>
      </div>
    </>
  );
};

export default NfPage;
