import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  FooterAboutUs,
  FooterQuickLinks,
  FooterSocial,
} from "./Footer-Components";
import { createUseStyles } from "react-jss";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
const NewFooter = () => {
  const { currentUser } = useSelector((state) => state.currentUser);

  const [links, setLinks] = useState([
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Products", to: "/" },
    {
      name: currentUser._id ? "Dashboard" : "Login/Sign-Up",
      to: currentUser._id ? "/account" : "/login",
    },
  ]);

  useEffect(() => {
    const stateClone = [...links];

    const newLink = {
      name: currentUser._id ? "Dashboard" : "Login/Sign-Up",
      to: currentUser._id ? "/account" : "/login",
    };

    stateClone.splice(3, 1, newLink);

    setLinks(stateClone);
  }, [currentUser._id]);

  const [medias, setMedias] = useState([
    { name: "instagram", href: "https://www.instagram.com/he3am_rahmani/" },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/hesam-rahmani-5a2b871b7/",
    },
    { name: "github", href: "https://github.com/he3am-rahmani" },
    { name: "twitter", href: "https://twitter.com/Real_no1_" },
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
