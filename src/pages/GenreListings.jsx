/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameCard from "../components/common/GameCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromApi } from "../config/api";
import Spinner from "../components/common/Spinner";
import LoadMoreBtn from "../components/common/LoadMoreBtn";
import useFetch from "../hooks/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadMoreSpinner from "../components/common/LoadMoreSpinner";
import "./styles.css";

const orderByValue = [
  { value: "updated", label: "Updated" },
  { value: "released", label: "Date added" },
  { value: "name", label: "Name" },
  { value: "added", label: "Popularity" },
  { value: "rating", label: "Average rating" },
];

const GenreListings = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: tagsData } = useFetch(`tags`);
  const [pageNum, setPageNum] = useState(1);
  const [gamesData, setGamesData] = useState(null);
  const [showTags, setShowTags] = useState(false);
  const [orderBy, setOrderBy] = useState("popularity");
  const [loading, setLoading] = useState(true);
  const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    const apiOrderBy = orderBy === "name" ? orderBy : `-${orderBy}`;
    fetchDataFromApi(`games?genres=${genreId}&ordering=${apiOrderBy}`)
      .then((response) => {
        setGamesData(response);
        setPageNum((prev) => prev + 1);
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchMoreData = async () => {
    setInfiniteScrollLoading(true);
    fetchDataFromApi(
      `games?page=${pageNum}&genres=${genreId}&ordering=${orderBy}`
    )
      .then((response) => {
        setGamesData({
          ...gamesData,
          results: [...gamesData.results, ...response.results],
        });
        setPageNum((prev) => prev + 1);
      })
      .catch((error) => console.log(error.message))
      .finally(setInfiniteScrollLoading(false));
  };

  useEffect(() => {
    setPageNum(1);
    setOrderBy(null);
    setGamesData(null);
    fetchInitialData();
  }, [genreId]);

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [orderBy]);

  const onChangeHandler = (e) => {
    setOrderBy(e.target.value);
  };

  const genreName = gamesData?.results?.[0]?.genres.find(
    (genre) => parseInt(genre.id) === parseInt(genreId)
  )?.name;

  if (loading) {
    return <Spinner />;
  }
  return (
    <section>
      {gamesData && (
        <>
          <div className='mx-6 items-center justify-between lg:flex'>
            <h2 className='my-7 ml-10 text-6xl font-extrabold '>
              {genreName} Games
            </h2>
            <div className='flex flex-wrap items-center gap-3 lg:flex-nowrap lg:space-x-4'>
              <select
                onChange={onChangeHandler}
                className='select ml-10 w-full max-w-xs border border-base-100 bg-base-300 shadow-lg'
              >
                <option disabled>Order by:</option>
                {orderByValue.map((item, index) => (
                  <option
                    key={index}
                    value={item.value}
                    selected={item.value === orderBy}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Order by years */}
            {/* Order by Platforms */}
          </div>

          {/* Tags */}
          <div
            className={`mx-6 my-4 line-clamp-1 flex flex-wrap items-center space-x-3 space-y-2 transition-all duration-200 ease-in-out lg:mx-20`}
          >
            <p className='text-lg font-semibold'>Related Tags:</p>
            {!!tagsData &&
              tagsData?.results?.map((tag, index) => {
                if (tag?.language === "eng") {
                  if (!showTags) {
                    if (index < 4) {
                      return (
                        <option
                          key={index}
                          onClick={() => navigate(`/tags/${tag.id}`)}
                          className='badge badge-neutral badge-lg cursor-pointer hover:text-gray-300'
                        >
                          {tag.name}
                        </option>
                      );
                    }
                  } else {
                    return (
                      <option
                        key={index}
                        onClick={() => navigate(`/tags/${tag.id}`)}
                        className='badge badge-neutral badge-lg cursor-pointer hover:text-gray-300'
                      >
                        {tag.name}
                      </option>
                    );
                  }
                }
              })}

            <span
              onClick={() => setShowTags(!showTags)}
              className='badge badge-secondary badge-lg'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className={`h-6 w-6 cursor-pointer transition-all duration-200 ease-in-out active:scale-95 ${
                  !showTags ? "" : "rotate-180 "
                }`}
              >
                <path
                  fillRule='evenodd'
                  d='M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          </div>

          <InfiniteScroll
            className='mx-2 my-6 flex w-full flex-col flex-wrap items-center justify-center gap-2 lg:flex-row'
            dataLength={gamesData?.results?.length || []}
            next={fetchMoreData}
            hasMore={gamesData?.next !== null}
            loader={<LoadMoreSpinner />}
          >
            {gamesData?.results?.map((item) => (
              <GameCard key={item.id} item={item} />
            ))}
          </InfiniteScroll>
        </>
      )}
    </section>
  );
};

export default GenreListings;
