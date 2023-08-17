/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import { Link } from "react-router-dom";
import LazyLoad from "./LazyLoad";
import { AiFillStar } from "react-icons/ai";

const GameCard = ({ item }) => {
  console.log(item?.short_screenshots);
  return (
    <>
      <div className='my-4 max-w-md rounded-lg border border-zinc-600 bg-zinc-800 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-zinc-600 lg:max-w-[300px]'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={false}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, EffectCreative]}
        >
          {item?.short_screenshots?.map((image, index) => {
            return (
              <>
                <SwiperSlide key={index}>
                  <LazyLoad image={image} />
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
        <div className='p-5'>
          <div className='flex justify-between '>
            <span className='space-x- flex items-center text-lg'>
              <AiFillStar fill='yellow' size={23} className='mr-1' />
              {item.rating.toFixed(1)}
            </span>
            <span className='ml-2 rounded-md border border-emerald-700 px-3 text-lg font-medium text-emerald-700'>
              {item?.metacritic}
            </span>
          </div>
          <Link to={`/game/details/${item.id}`}>
            <h2 className='mb-2 line-clamp-1  items-center text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-400 dark:text-white'>
              {item.name}
            </h2>
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

{
  /*  <img
  key={image.id}
  className={`h-[12rem] w-full rounded-t-lg object-fill lg:h-[10rem] lg:w-[24rem] ${
    !image?.image && "bg-zinc-700"
  } `}
  src={image.image ? image.image : imageNotAvailable}
  alt=''
/> */
}
