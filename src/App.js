import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie";
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {

      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
      console.log(chosenInfo);
    }

    loadAll();
  },[]);

  return (
    <div className="page">

      <Header></Header>

      {featureData && <FeatureMovie item={featureData}></FeatureMovie>}


      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))}
      </section>
    </div>
  );

}