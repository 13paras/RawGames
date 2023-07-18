/* eslint-disable react/prop-types */

const LoadMoreBtn = ({ loadMoreHandler, loading }) => {
  return (
    <button
      onClick={loadMoreHandler}
      className={`btn-ghost btn my-10 flex w-48 items-center rounded-lg bg-[#303030] py-1 ${
        loading && "text-gray-500"
      } `}
    >
      Load more{" "}
      {loading && <span className='loading loading-spinner loading-sm'></span>}
    </button>
  );
};

export default LoadMoreBtn;
