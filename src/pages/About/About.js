import React, { useState } from "react";
import { Carousel, Container, Form, ListGroup } from "react-bootstrap";

const About = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Container style={{ marginTop: "4rem" }} className="text-center">
        <Carousel
          style={{ color: "black" }}
          activeIndex={index}
          onSelect={handleSelect}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://content.gallup.com/origin/gallupinc/GallupSpaces/Production/Cms/POLL/yif4rl7rlua3n0kelzevow.jpg"
              alt="We"
            />
            <Carousel.Caption>
              <h3>Hello </h3>
              <p>We Are No1 Team</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{height:'620px'}}
              src="https://1040abroad.com/wp-content/uploads/2014/10/pexels-photo-772665.jpeg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>This is Us</h3>
              <p>See You Later 🤞👋</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
};

export default About;
