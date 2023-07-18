/* eslint-disable react/prop-types */
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import imageNotAvailable from "../../assets/2953962.jpg";

const LazyLoad = ({ image }) => {
  return (
    <div>
      <LazyLoadImage
        src={image?.image ? image?.image : imageNotAvailable}
        effect='blur'
        className={`h-[12rem] w-[28rem] rounded-t-lg object-fill lg:h-[10rem] lg:w-[24rem] ${
          !image?.image && "bg-zinc-700"
        } `}
      />
    </div>
  );
};

export default LazyLoad;
