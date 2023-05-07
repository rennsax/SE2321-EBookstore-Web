import { memo } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import api from "service/api.json";

const BookCarousel = memo(function BookCarousel() {
  const createItems = (sourceUrl: string) => {
    const res: JSX.Element[] = [];
    // TODO fixed number?
    for (let i = 0; i < 4; ++i) {
      res.push(
        <img
          className="carousel-pic"
          alt={"carousel picture" + new Number(i).toString()}
          key={"carousel picture" + new Number(i).toString()}
          src={`${sourceUrl}/book${i + 1}.jpg`}
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
          {createItems(api["carousel.picture"])}
        </Carousel>
      </div>
    </div>
  );
});

export default BookCarousel;
