import Sidebar from "../components/layout/Sidebar";
import Discover from "../components/layout/Discover";
import { Route, Routes } from "react-router-dom";
import GameDetails from "./GameDetails";
import GenreListings from "./GenreListings";
import Genres from "./Genres";
import SearchResults from "./SearchResults";
import PageNotFound from "./PageNotFound";
import Tags from "./Tags";

const Home = () => {
  return (
    <div className='flex h-[calc(100%-5rem)] flex-row lg:mx-8'>
      <div className='flex'>
        <div>
          <Sidebar />
        </div>
        <div className='w-[calc(100%-240px] h-full flex-1 overflow-y-auto'>
          <Routes>
            <Route path='/genres' element={<Genres />} />
            <Route path='/genreListing/:genreId' element={<GenreListings />} />
            <Route path='/' element={<Discover />} />
            <Route path='/game/details/:gameId' element={<GameDetails />} />
            <Route path='/search/:query' element={<SearchResults />} />
            <Route path='/tags/:tagId' element={<Tags />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
