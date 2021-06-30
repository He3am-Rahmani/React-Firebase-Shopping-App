import React from "react";
import { createUseStyles } from "react-jss";

const FooterSocial = ({ medias }) => {
  const useStyle = createUseStyles({
    layout: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "3rem",
    },
    mediasCover: {
      backgroundColor: "#f3f3f3",
      padding: "0.8rem 1.2rem",
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: "#75c7f8",
        color: "#e8103d", // also #f3f3f3 isVery Beautiful
      },
    },
  });

  const styles = useStyle();

  return (
    <>
      <layout className={styles.layout}>
        {medias.map((item, index) => (
          <a target="blank" href={item.href}>
            <div className={styles.mediasCover}>
              <i className={`fa fa-${item.name}`}></i>
            </div>
          </a>
        ))}
      </layout>
    </>
  );
};

export default FooterSocial;
