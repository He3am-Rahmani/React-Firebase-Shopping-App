import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { AiOutlineUser } from "react-icons/ai";

export const Button = ({ to, children, className, onClick, isAvatar, id }) => {
  const useStyles = createUseStyles({
    button: {
      display: "flex",
      flexDirection: "row",
      padding: "14px",
      margin: "2px",
      justifyContent: "center",
      alignItems: "center",
      // alignContent:'center',
      transition: "all 0.2s",
      "&:hover": {
        textDecoration: "none",
        // backgroundColor: "#f3f3f3f3",
        color: "#0d3655",
      },
      "@media(max-width:570px)": {
        width: "100%",
        "&:hover": {},
      },
    },
    image: {
      width: "25px",
      height: "25px",
      marginRight: "5px",
      borderRadius: "25px",
      backgroundPosition: "center",
      backgroundSize: "cover",
      marginTop: "2px",
      "@media(max-width:570px)": {
        width: "35px",
        height: "35px",
      },
    },
  });

  const styles = useStyles();

  return (
    <>
      <Link
        id={id}
        onClick={onClick}
        className={`${styles.button} ${className}`}
        to={to}
      >
        {isAvatar ? (
          <>
            {isAvatar !== "withoutAvatar" ? (
              <div
                className={styles.image}
                alt="Avatar"
                style={{ backgroundImage: `url(${isAvatar})` }}
              ></div>
            ) : (
              <>
                <AiOutlineUser style={{ fontSize: "1.75rem" }} />
              </>
            )}
          </>
        ) : (
          <></>
        )}
        {children}
      </Link>
    </>
  );
};
