import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";



export const Button = ({ to, children, className, onClick, isAvatar ,id}) => {
  const useStyles = createUseStyles({
    button: {
      display: "flex",
      flexDirection: "row",
      padding: "14px",
      margin: "2px",
      justifyContent: "center",
      alignItems: "start",
      // alignContent:'center',
      transition: "all 0.2s",
      "&:hover": {
        textDecoration: "none",
        backgroundColor: "#f3f3f3",
        color:'#000',
      },
      "@media(max-width:430px)": {
        width:'100%'
       , '&:hover': {
        }
      },
    },
    image: {
      width: "25px",
      height: "25px",
      marginRight: "5px",
      borderRadius: "25px"
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
          <img
            className={styles.image}
            alt="Avatar"
            src={isAvatar}
          />
        ) : null}
        {children}
      </Link>
    </>
  );
};
