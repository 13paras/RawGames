import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { genres } = useSelector((state) => state.home);
  return (
    <div className=' h-full w-[15rem] space-y-4 pl-3 lg:w-[16.5rem]'>
      <h1 className='mx-4 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:text-gray-400'>
        <Link to={"/"}>Home</Link>
      </h1>
      <ul className='mx-4'>
        <h2 className='mb-3 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:hover:text-gray-400'>
          <Link to={"/genres"}>Genres</Link>
        </h2>

        {genres &&
          genres.map((genre) => (
            <div
              onClick={() =>
                navigate(`/genreListing/${genre.id}`, { replace: true })
              }
              key={genre.id}
              className={`my-1 flex cursor-pointer items-center space-x-4 rounded-md py-2 pl-2 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-zinc-800 `}
            >
              <img
                className='inline h-10 w-12 rounded-lg object-cover object-center transition-all duration-300 ease-in-out hover:opacity-50'
                src={genre.image_background}
                alt={genre.slug}
              />
              <span className=' text-base text-white transition-all duration-300 ease-in-out hover:text-gray-400'>
                {genre.name}
              </span>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
