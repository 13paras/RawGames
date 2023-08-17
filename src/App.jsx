/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ToasterComponent from "./components/Toaster/ToasterComponent";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import Header from "./components/layout/Header";
import { useDispatch } from "react-redux";
import { setGenres } from "./slice/homeSlice";
import Home from "./pages/Home";
import Spinner from "./components/common/Spinner";

function App() {
  const dispatch = useDispatch();
  const { data: genres, loading: genreLoading } = useFetch("genres");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (genres) {
      dispatch(setGenres(genres?.results));
      setLoading(false);
    }
  }, [genres]);

  if (loading && genreLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BrowserRouter>
        <div className=''>
          <Header />
          <Routes>
            <Route path='/*' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToasterComponent />
    </>
  );
}

export default App;
