import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const FooterAboutUs = () => {
  const useStyle = createUseStyles({
    logo: {
      fontWeight: "600",
      fontSize: "2rem",
      fontFamily: "logo",
      "&:hover": {
        textDecoration: "none",
      },
    },
    aboutLayout: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const styles = useStyle();

  return (
    <div className={styles.aboutLayout}>
      <Link to="/about" className={styles.logo}>
        WE Are N01 Team
      </Link>
      <p>You Won't Be Alone Till We Are Alive</p>
    </div>
  );
};

export default FooterAboutUs;
