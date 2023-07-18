import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AiFillFolderOpen, AiFillGift, AiFillPlusCircle } from "react-icons/ai";
import Stats from "../components/mix/Stats";
import { htmlToText } from "html-to-text";
import VideoPopup from "../components/common/videopopup/VideoPopup";
import PlayIcon from "../assets/icons8-play-48.png";

const GameDetails = () => {
  const { gameId } = useParams();
  const { data, loading } = useFetch(`games/${gameId}`);
  const { data: gamesVideos, loading: gamesVideosLoading } = useFetch(
    `games/${gameId}/movies`
  );
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [readMore, setReadMore] = useState(false);
  useEffect(() => {
    // console.log(gamesVideos);
    console.log(htmlToText(data?.description).length);
  }, []);
  // console.log(show);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className='relative'>
      {!!data && (
        <div className='relative'>
          <div
            className='hero w-full lg:min-h-screen'
            style={{
              backgroundImage: `url(${data?.background_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgb(32, 32, 32)",
              backgroundColorOpacity: 0.5,
            }}
          >
            <div
              style={{
                // backgroundColor: "rgb(32, 32, 32)",
                backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 40%)`,
              }}
              className='hero-overlay bg-opacity-70'
            ></div>
            <div className='container relative z-20 mx-auto space-y-5 pt-10'>
              <a target='_blank' href={data?.website} rel='noreferrer'>
                <h1 className='my-4 text-center text-6xl font-extrabold'>
                  {" "}
                  {data?.name}{" "}
                </h1>
              </a>
              <div className='flex items-center justify-center space-x-2 lg:space-x-4'>
                <button className='btn-primary btn-sm btn lg:btn-md'>
                  Add to my games <AiFillPlusCircle size={23} />
                </button>
                <button className='btn-primary btn-sm btn lg:btn-md'>
                  Add to Wishlist <AiFillGift size={23} />
                </button>
                <button className='btn-ghost btn-sm btn lg:btn-md'>
                  Save to Collection <AiFillFolderOpen size={23} />
                </button>
              </div>
              {/* StatsComp */}
              <div className='flex justify-center lg:flex-none'>
                <Stats data={data} />
              </div>
              {/* About */}
              <div className='mx-4'>
                <h3 className='my-2 text-2xl font-bold '>About</h3>
                <p
                  className={`text-gray-400  ${
                    !readMore
                      ? "line-clamp-5"
                      : "line-clamp-none transition-all duration-200 ease-in-out"
                  }`}
                >
                  {htmlToText(data?.description)}
                </p>
                {data?.description &&
                  htmlToText(data?.description).length > 500 && (
                    <button
                      onClick={() => setReadMore(!readMore)}
                      className='btn-accent btn-xs btn'
                    >
                      {readMore ? "Show Less" : "Read More"}
                    </button>
                  )}
              </div>
              {/* Group */}
              <div className='mx-4 mt-3 space-y-3 lg:grid lg:grid-cols-2 lg:gap-3'>
                <div>
                  <h4 className='font-semibold text-white hover:text-gray-400'>
                    Platform
                  </h4>
                  {data?.platforms?.map((platform, index) => (
                    <span
                      key={platform.platform.id}
                      className='text-gray-300 hover:text-gray-400'
                    >
                      {platform.platform.name}
                      {data?.platform?.length - 1 !== index && ", "}
                    </span>
                  ))}
                </div>
                <div>
                  <h4 className='font-semibold text-white hover:text-gray-400'>
                    MetaScore
                  </h4>
                  <span className='text-gray-300 hover:text-gray-400'>
                    {" "}
                    {data?.metacritic}{" "}
                  </span>
                </div>
                <div>
                  <h4 className='font-semibold text-white hover:text-gray-400'>
                    Genre
                  </h4>
                  {data?.genres.map((genre, index) => (
                    <span
                      onClick={() => navigate(`/genreListing/${genre.id}`)}
                      className='cursor-pointer text-gray-300 hover:text-gray-400'
                      key={genre.id}
                    >
                      {" "}
                      {genre.name} {data?.genres.length - 1 !== index && ", "}
                    </span>
                  ))}
                </div>
                <div>
                  {data?.developers && (
                    <>
                      <h4 className='font-semibold text-white '>Developers</h4>
                      {data?.developers.map((developer, index) => (
                        <span
                          className='text-gray-300 hover:text-gray-400'
                          key={developer.id}
                        >
                          {" "}
                          {developer.name}{" "}
                          {data?.developers?.length - 1 !== index && ", "}
                        </span>
                      ))}
                    </>
                  )}
                </div>
                <div>
                  <h4 className='font-semibold text-white '>Publisher</h4>
                  {data?.publishers?.map((publisher, index) => (
                    <span
                      key={publisher.id}
                      className='text-gray-300 hover:text-gray-400'
                    >
                      {publisher.name}
                      {data?.publishers?.length - 1 !== index && ", "}
                    </span>
                  ))}
                </div>

                <div>
                  <h4 className='font-semibold text-white '>Age rating</h4>
                  <span className='text-gray-300 hover:text-gray-400'>
                    {["mature", "teen", "adults-only", "everyone"].includes(
                      data?.esrb_rating?.slug
                    )
                      ? "18+ Only"
                      : "All"}
                  </span>
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-white '>
                    Tags{" "}
                    <img
                      className='absolute'
                      src='https://icons8.com/icon/GwYlS5m5Goz6/play'
                      alt=''
                    />
                  </h3>
                  {data?.tags?.map((tag, index) => (
                    <>
                      <a
                        onClick={() => navigate(`/tags/${tag?.id}`)}
                        className='text-gray-400'
                        key={tag.id}
                        href=''
                      >
                        {" "}
                        {"#" + tag.name}{" "}
                        {data?.tags?.length - 1 !== index && ", "}
                      </a>
                    </>
                  ))}
                </div>
                {/* Videos and images */}
                <div>
                  {!!gamesVideos && (
                    <>
                      <h3 className='mx-4 text-2xl font-extrabold'>
                        Videos and More
                      </h3>
                      <div className='mt-3 grid grid-cols-3 gap-2'>
                        {gamesVideos?.results?.map((video, index) => {
                          if (index >= 4) {
                            return (
                              <div key={index} className='mx-auto w-[13rem]'>
                                <figure className='relative'>
                                  <img
                                    className='rounded-lg'
                                    src={video?.preview}
                                    alt=''
                                  />
                                  <img
                                    className='absolute left-20 top-10 z-20 w-10 cursor-pointer hover:scale-105 hover:shadow-lg'
                                    src={PlayIcon}
                                    alt=''
                                    onClick={() => {
                                      setShow(true);
                                    }}
                                  />
                                </figure>
                                <span className='text-center text-xs text-gray-400'>
                                  {video?.name}
                                </span>
                                {show && (
                                  <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    video={video}
                                  />
                                )}
                              </div>
                            );
                          }
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* Description */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
