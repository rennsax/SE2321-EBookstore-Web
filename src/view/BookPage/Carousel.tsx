import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React, { memo } from "react";
import { Carousel } from "react-responsive-carousel";
import carouselBooks from "assets/carousel";

const BookCarousel = memo(function BookCarousel() {
  const createItems = (carouselBooks: string[]) => {
    const res: JSX.Element[] = [];
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
});

export default BookCarousel;
