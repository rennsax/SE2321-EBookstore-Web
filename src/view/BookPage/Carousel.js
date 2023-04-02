import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function BookCarousel({ picPath }) {
  const createItems = (ctx) => {
    const images = ctx.keys().map(ctx);
    let res = [];
    for (let i = 0; i < ctx.keys().length; ++i) {
      let img = images[i];
      res.push(
        <img className='carousel-pic'
          alt={"carousel picture" + i}
          key={"carousel picture" + i}
          src={img}
        />
      )
    }
    // res.map((obj) => {
    //   return (<div>{obj}</div>);
    // });
    return res;
  }

  // TODO Why can not use picPath?
  const requireContext = require.context("assets/carousel", true, /^\.\/.*\.jpg$/);
  // console.log(picPath);
  return (
    <div className="carousel">
      <div className="carousel_container">
        <Carousel autoPlay={true} interval={4000} showThumbs={false} infiniteLoop={true} >
          {createItems(requireContext)}
        </Carousel>
      </div>
    </div>
  );
};