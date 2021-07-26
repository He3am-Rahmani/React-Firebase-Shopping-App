import React from "react";
import { Image, Container } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import myImage from "../../Assets/images/hesam-rahmani.JPG";

const About = () => {
  document.title = "About";
  const useStyle = createUseStyles({
    mainContent: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    myImage: { width: "50%" },
    aboutTexts: {
      // margin: "4rem",
      margin: "0 auto",
      fontSize: "1.5rem",
      // ,border:'1px solid #000'
      borderRadius: "10px",
      padding: "1rem 1rem",
      height: "100%",
      boxShadow: "0 0 7px 10px rgba(0,0,0,0.05)",
    },
  });

  const styles = useStyle();

  return (
    <>
      {/* <Container> */}
      <content className={styles.mainContent}>
        <h1>About Us</h1>
        <div className={styles.aboutTexts}>
          <p>
            I am Hesam Rahmani ReactJs & NodeJs developer
            <br />
            And this is a portfolio for my Resume
          </p>
        </div>
        {/* <Image
            className={styles.myImage}
            src={myImage}
            alt="Hesam Rahamani"
          /> */}
      </content>
      {/* </Container> */}
    </>
  );
};

export default About;
