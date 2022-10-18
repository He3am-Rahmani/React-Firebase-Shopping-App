import { useState } from "@hookstate/core";
import React from "react";
import { Image, Container } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import myImage from "../../Assets/images/hesam-rahmani.jpg";
import userStore from "../../userStore";

const About = () => {
  document.title = "About";
  const useStyle = createUseStyles({
    mainContent: {
      display: "flex",
      flexDirection: "row-reverse",
      alignContent: "center",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: "100%",
      "@media(max-width:1000px)": {
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: "2rem",
      },
    },
    imageContainer: {
      width: "49%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    myImage: {
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      backgroundImage: `url(${myImage})`,
      backgroundPosition: "right",
      backgroundSize: "cover",
      "@media(max-width:570px)": {
        width: "250px",
        height: "250px",
      },
    },
    textContainer: {
      width: "49%",
      "@media(max-width:1000px)": {
        width: "100%",
      },
    },
    aboutTexts: {
      // margin: "4rem",
      margin: "0 auto",
      fontSize: "1.5rem",
      // ,border:'1px solid #000'
      borderRadius: "5px",
      padding: "1rem 1rem",
      height: "100%",
      boxShadow: "0 0 7px 10px rgba(0,0,0,0.03)",
    },
  });

  const styles = useStyle();

  const currentYear = new Date().getFullYear();

  const myAge = currentYear - 2004;
  const experience = currentYear - 2019
  const userState = useState(userStore);
  
  return (
    <>
      <h2>About Me</h2>
      <content className={styles.mainContent}>
        <div className={styles.textContainer}>
          <div className={styles.aboutTexts}>
            <p>
              I'm Hesam Rahmani, i am {myAge}y/o and i live in Iran.
              <br />
              I'm Front-End Developer with {experience} Year experience, and this is
              a Portfolio For my CV
            </p>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div
            className={styles.myImage}
            src={myImage}
            alt="Hesam Rahamani"
          ></div>
        </div>
      </content>
    </>
  );
};

export default About;
