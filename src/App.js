import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
export default () => {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const loadAll = async () => {

      let list = await Tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  },[]);

  return (
    <div className="page">
      <section className="lists">
        {movieList.map((tem, key) => (
          <MovieRow key={key}></MovieRow>
        ))}
      </section>
    </div>
  );

}