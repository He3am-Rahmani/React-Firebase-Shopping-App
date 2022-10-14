import React from "react";
import { Button } from "../../Header/Header-Components/HeaderComponents";

import { createUseStyles } from "react-jss";

const FooterQuickLinks = ({ links }) => {
  const useStyle = createUseStyles({
    layout: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "1rem",
      alignItems: "center",
      "@media(max-width:570px)": { display: "none" },
    },
    links: {
      borderRadius: "12px",
    },
  });

  const styles = useStyle();

  return (
    <layout className={styles.layout}>
      {links.map((item, index) => (
        <Button className={styles.links} to={item.to}>
          {item.name}
        </Button>
      ))}
    </layout>
  );
};

export default FooterQuickLinks;
