import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className=' h-full w-[15rem] space-y-4 overflow-y-auto pl-3 lg:w-[16rem]'>
      <h1 className='mx-4 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:text-gray-400'>
        <Link to={"/"}>Home</Link>
      </h1>
      <ul className='mx-4'>
        <h2 className='mb-3 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:hover:text-gray-400'>
          <Link to={"/genres"}>Genres</Link>
        </h2>

        {genres &&
          genres.map((genre) => (
            <li
              key={genre.id}
              className=' transition-all duration-300 ease-in-out'
            >
              <Link
                to={`/genreListing/${genre.id}`}
                className='flex items-center space-x-2 space-y-5'
              >
                <img
                  className='h-8 w-10 rounded-lg object-cover object-center transition-all duration-300 ease-in-out hover:opacity-50'
                  src={genre.image_background}
                  alt={genre.slug}
                />
                <a className='text-base text-white transition-all duration-300 ease-in-out hover:text-gray-400'>
                  {genre.name}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
