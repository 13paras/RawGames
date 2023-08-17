/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import GameCard from "../common/GameCard";
import Spinner from "../common/Spinner";
import { fetchDataFromApi } from "../../config/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import LoadMoreSpinner from "../common/LoadMoreSpinner";
import Select from "react-select";

let filters = {};

const orderByData = [
  { value: "updated", label: "Latest Updated" },
  { value: "released", label: "Date added" },
  { value: "name", label: "Name" },
  { value: "added", label: "Popularity" },
  { value: "rating", label: "Average rating" },
];

const Discover = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("popularity");
  const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);

  const fetchInitialData = () => {
    const apiOrderBy =
      orderBy?.value === "name" ? orderBy.value : `-${orderBy.value}`;
    fetchDataFromApi(`games?ordering=${apiOrderBy}`)
      .then((response) => {
        setData(response);
        setPage((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // console.log(orderBy);

  useEffect(() => {
    // setLoading(true)
    // setPage(1);
    fetchInitialData();
    // setLoading(false)
  }, [orderBy]);

  const onChangeHandler = (selectedItems, action) => {
    setLoading(true);
    if (action.name === "orderBy") {
      setOrderBy(selectedItems);
    }
    setPage(1);
    fetchInitialData();
    setLoading(false);
  };

  const fetchMoreData = () => {
    setInfiniteScrollLoading(true);
    fetchDataFromApi(`games?page=${page}`, filters).then((response) => {
      setData({
        ...data,
        results: [...data.results, ...response.results],
      });
      setPage((prev) => prev + 1);
    });
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#202020",
      borderColor: "#202020",
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#2ECC71"
        : state.isFocused
        ? "#555555"
        : "#202020",
      color: state.isSelected ? "white" : "inherit",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
    }),
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <div className='mx-6 items-center justify-between lg:flex'>
        <h2 className='my-7 ml-10 text-6xl font-extrabold '>
          New And Trending
        </h2>
        <Select
          name='orderBy'
          options={orderByData}
          value={orderBy}
          onChange={onChangeHandler}
          closeMenuOnSelect={true}
          placeholder='Order by:'
          styles={customStyles}
          classNamePrefix='react-select'
          className={" z-20 ml-10 w-full max-w-xs "}
        />
      </div>

      <InfiniteScroll
        className='mx-2 my-6 flex w-full flex-col flex-wrap items-center justify-center gap-2 lg:flex-row'
        dataLength={data?.results?.length || []}
        next={fetchMoreData}
        hasMore={data?.next != null}
        loader={<LoadMoreSpinner />}
      >
        {data &&
          data?.results?.map((item) => (
            <>
              {/* Cards which are first shown on home page */}
              <GameCard key={item.id} item={item} />
            </>
          ))}
      </InfiniteScroll>
    </main>
  );
};

export default Discover;
