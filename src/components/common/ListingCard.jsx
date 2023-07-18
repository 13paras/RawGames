/* eslint-disable react/prop-types */
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const ListingCard = ({ info }) => {
  const navigate = useNavigate();

  //   Tailwind Classes
  const styles = {
    flexItems: "flex items-center justify-between text-gray-500 text-sm",
  };
  const popularGames = info?.games?.map((item, index) => {
    if (index < 3) {
      return (
        <li
          onClick={() => navigate(`/game/details/${item.id}`)}
          key={item.id}
          className={`${styles.flexItems} cursor-pointer hover:text-gray-300`}
        >
          <span className='underline underline-offset-4'>{item?.name}</span>
          <span className='flex items-center text-gray-700'>
            {item?.added} <AiOutlineUser color='gray' />
          </span>
        </li>
      );
    }
  });
  return (
    <div className=' w-[24rem] rounded-lg border border-gray-700 shadow-lg shadow-black'>
      <div
        className='hero max-h-full bg-black'
        style={{
          backgroundImage: `url(${info.image_background})`,
        }}
      >
        <div
          style={{
            // backgroundColor: "rgb(32, 32, 32)",
            backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 80%)`,
          }}
          className='hero-overlay bg-opacity-25'
        ></div>
        <div className='hero-content h-full w-[350px] text-base text-white'>
          <div className='w-full'>
            <Link to={`/genreListing/${info?.id}`}>
              <h1 className='mb-8 text-center text-2xl font-bold underline underline-offset-8 transition-all duration-300 ease-in-out hover:text-gray-400'>
                {info?.name}
              </h1>
            </Link>
            <div
              className={`${styles.flexItems} mb-8 border-b-[1px] border-gray-700 pb-2 `}
            >
              <h5 className='text-gray-300'>Popular items</h5>
              <span> {info?.games_count} </span>
            </div>
            <ul className='space-y-2'>{popularGames}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
