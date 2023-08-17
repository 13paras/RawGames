import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchInput) {
      navigate(`/search/${searchInput}`);
      setSearchInput("");
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex w-full justify-center text-xs md:text-base'
    >
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        type='text'
        placeholder='search for games'
        className='input-primary input w-full max-w-[10rem] rounded-xl text-xs focus:outline-none md:max-w-sm md:rounded-2xl md:text-base lg:max-w-xl'
      />
    </form>
  );
};

export default Search;
