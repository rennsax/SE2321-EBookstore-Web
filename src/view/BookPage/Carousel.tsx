import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import carouselBooks from "assets/carousel";

export default function BookCarousel() {
  const createItems = (carouselBooks: string[]) => {
    let res = [];
    for (let i = 0; i < carouselBooks.length; ++i) {
      res.push(
        <img
          className="carousel-pic"
          alt={"carousel picture" + new Number(i).toString()}
          key={"carousel picture" + new Number(i).toString()}
          src={carouselBooks[i]}
        />
      );
    }
    return res;
  };

  return (
    <div className="carousel">
      <div className="carousel_container">
        <Carousel
          autoPlay={true}
          interval={4000}
          showThumbs={false}
          infiniteLoop={true}
        >
          {createItems(carouselBooks)}
        </Carousel>
      </div>
    </div>
  );
}
