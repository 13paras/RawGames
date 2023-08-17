import { BiSolidGhost } from "react-icons/bi";
import { useSelector } from "react-redux";
import ListingCard from "../components/common/ListingCard";

const Genres = () => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className='ml-28 lg:ml-0'>
      <h1 className='my-7 ml-10 flex items-center justify-center text-6xl font-extrabold '>
        <BiSolidGhost className='mr-2 rounded-lg bg-white' color='black' />
        Genres
      </h1>
      <div className='mx-2 my-6 flex w-full flex-col flex-wrap items-center justify-center gap-4 lg:flex-row'>
        {genres &&
          genres?.map((genre) => <ListingCard key={genre.id} info={genre} />)}
      </div>
    </div>
  );
};

export default Genres;

// mt-7 grid grid-cols-1 place-items-center gap-4 lg:grid-cols-4
