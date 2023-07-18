/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { fetchDataFromApi } from "../config/api";
import GameCard from "../components/common/GameCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadMoreSpinner from "../components/common/LoadMoreSpinner";

const SearchResults = () => {
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`games?search=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        console.log("PageNum from fetchInitial Data pageNumber==> " + pageNum);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchMoreData = () => {
    setInfiniteLoading(true);
    // const nextPageNum = pageNum + 1;
    fetchDataFromApi(`games?search=${query}&page=${pageNum}`)
      .then((res) => {
        if (res?.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
          setPageNum((prev) => prev + 1);
          setInfiniteLoading(false);
          console.log(data);
          console.log("PageNum from fetchMoreData pagenumber ==> " + pageNum);
        }
      })
      .finally(() => {
        setInfiniteLoading(false);
      });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
    // console.log(data);
  }, [query]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='w-full'>
      {data ? (
        <>
          <div className='my-12 ml-4 text-lg'>
            <span>
              Searched for{" "}
              <q>
                {" "}
                <strong> {query} </strong>
              </q>{" "}
            </span>
            <span>
              found {data?.count}{" "}
              {data?.results?.length > 1 ? "results" : "result"}{" "}
            </span>
          </div>
          {/* Searched Games */}
          <InfiniteScroll
            className='grid grid-cols-1 justify-center gap-4 p-5 lg:grid-cols-3 xl:grid-cols-5'
            dataLength={data?.results?.length || []}
            next={fetchMoreData}
            hasMore={data?.next != null}
            loader={<LoadMoreSpinner />}
          >
            {data?.results?.map((item) => (
              <>
                <GameCard key={item.id} item={item} />
              </>
            ))}
          </InfiniteScroll>
        </>
      ) : (
        <span className='flex items-center justify-center text-6xl font-extrabold'>
          Sorry, No Games Found...!!
        </span>
      )}
    </div>
  );
};

export default SearchResults;
