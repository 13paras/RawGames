import { BiSolidGhost } from "react-icons/bi";
import { useSelector } from "react-redux";
import ListingCard from "../components/common/ListingCard";
import { useEffect } from "react";

const Genres = () => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className='m-4'>
      <h1 className='my-8 flex items-center justify-center text-4xl font-extrabold text-white'>
        <BiSolidGhost className='mr-2 rounded-lg bg-white' color='black' />
        Genres
      </h1>
      <div className='mt-7 grid grid-cols-1 place-items-center gap-4 lg:grid-cols-4'>
        {genres &&
          genres?.map((genre) => <ListingCard key={genre.id} info={genre} />)}
      </div>
    </div>
  );
};

export default Genres;

// mt-7 grid grid-cols-1 place-items-center gap-4 lg:grid-cols-4
