/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCreative,
} from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import imageNotAvailable from "../../assets/2953962.jpg";
import LazyLoad from "./LazyLoad";

const GameCard = ({ item }) => {
  return (
    <>
      <div className='my-4 max-w-md rounded-lg border border-gray-200 bg-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 lg:max-w-[300px]'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, EffectCreative]}
        >
          {item?.short_screenshots?.map((image, index) => {
            const styles = `h-[12rem] w-full rounded-t-lg object-fill lg:h-[10rem] lg:w-[24rem] ${
              !image?.image && "bg-zinc-700"
            } `;
            return (
              <>
                <SwiperSlide key={index}>
                  <LazyLoad image={image} />
                  {/*  <img
                  key={image.id}
                  className={`h-[12rem] w-full rounded-t-lg object-fill lg:h-[10rem] lg:w-[24rem] ${
                    !image?.image && "bg-zinc-700"
                  } `}
                  src={image.image ? image.image : imageNotAvailable}
                  alt=''
                /> */}
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
        <div className='p-5'>
          <div
            className='radial-progress bg-base-300 text-sm text-accent'
            style={{
              "--value": `${Math.floor(item.rating * 10)}`,
              "--size": "3rem",
            }}
          >
            {Math.floor(item.rating * 10)}%
          </div>
          <Link to={`/game/details/${item.id}`}>
            <h5 className='mb-2 line-clamp-1 text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-400 dark:text-white'>
              {item.name}
            </h5>
          </Link>

          <ul className='space-x-3'>
            {item?.genres.map((genre, index) => {
              if (index < 3)
                return (
                  <div
                    key={genre.id + 12}
                    className='badge badge-primary badge-sm'
                  >
                    {genre.name}
                  </div>
                );
            })}
          </ul>
          <p>
            Released:{" "}
            {item?.released !== null
              ? dayjs(item.released).format("DD MMMM YYYY")
              : "not provided"}
          </p>
        </div>
      </div>
    </>
  );
};

export default GameCard;
