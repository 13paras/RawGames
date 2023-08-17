import Search from "../common/Search";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='mx-1 flex items-center justify-between py-2 lg:container md:mx-3 lg:mx-auto'>
      <h1
        onClick={() => navigate("/")}
        className=' px-2 text-sm font-semibold uppercase md:btn-ghost md:btn md:text-3xl md:font-extrabold'
      >
        {" "}
        raw games
      </h1>
      <div className='flex-1 lg:flex-[2_2_0%] '>
        <Search />
      </div>
      <ul className='flex items-center space-x-6'>
        <div className='online avatar'>
          <div className='w-10 rounded-full md:w-16'>
            <img src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80' />
          </div>
        </div>
      </ul>
    </header>
  );
};

export default Header;
