import React from "react";
import Search from "../common/Search";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className=' py-2'>
      <div className='mx-4 flex items-center justify-between lg:container lg:mx-auto'>
        <h1
          onClick={() => navigate("/")}
          className='btn-ghost btn text-3xl font-extrabold uppercase'
        >
          {" "}
          rawg games
        </h1>
        <div className='flex-1 lg:flex-[2_2_0%] '>
          <Search />
        </div>
        <ul className='flex items-center space-x-6'>
          <div className='dropdown-hover dropdown'>
            <label tabIndex={0} className='btn m-1'>
              Hover
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content menu rounded-box z-20 w-44 bg-base-300 p-2 shadow'
            >
              <li>
                <a>Whishlist</a>
              </li>
              <li>
                <a>My games</a>
              </li>
              <li>
                <a>Collections</a>
              </li>
            </ul>
          </div>
          <div className='online avatar'>
            <div className='w-16 rounded-full'>
              <img src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80' />
            </div>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;
