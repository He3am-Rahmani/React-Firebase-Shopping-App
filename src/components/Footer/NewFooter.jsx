import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  FooterAboutUs,
  FooterQuickLinks,
  FooterSocial,
} from "./Footer-Components";
import { createUseStyles } from "react-jss";
import { useAuth } from "../../contexts/AuthContext";

const NewFooter = () => {
  const { currentUser } = useAuth();

  const [links, setLinks] = useState([
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Products", to: "/" },
    {
      name: currentUser ? "Dashboard" : "Login/Sign-Up",
      to: currentUser ? "/account" : "/login",
    },
  ]);

  const [medias, setMedias] = useState([
    { name: "instagram", href: "https://www.instagram.com/he3am_rahmani/" },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/hesam-rahmani-5a2b871b7/",
    },
    { name: "github", href: "https://github.com/he3am-rahmani" },
    { name: "twitter", href: "https://twitter.com/he3am-rahmani" },
  ]);
  const useStyle = createUseStyles({
    footerParent: {
      boxShadow: "0 0 20px 20px rgba(0,0,0,0.05)",
      marginTop: "4rem",
      padding: "3rem 0",
    },
    content: { display: "flex", flexDirection: "column", gap: "2rem" },
  });

  const styles = useStyle();

  return (
    <footer className={styles.footerParent}>
      <Container className={styles.content}>
        <FooterAboutUs />
        <FooterSocial medias={medias} />
        <FooterQuickLinks links={links} />
      </Container>
    </footer>
  );
};

export default NewFooter;
