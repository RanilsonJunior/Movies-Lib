import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";

import './MoviesGrid.css';

// Está pegando do .env e jogando nas const.
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  
  // Está fazendo o fetch
  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    // está jogando o fetch já concluído no useState, para poder usar ele no map.
    setTopMovies(data.results);
  }

  // O useEffect vai ser renderizado sempre que a página for renderizada.
  useEffect(() => {
    // Está juntando a api com os mais procurados e com a chave da api.
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    // Depois está jogando dentro da função, onde faz o fetch, como parâmetro da url.
    getTopRatedMovies(topRatedUrl);
  }, [])

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => 
          <MovieCard key={movie.id} movie={movie} />
        )}
      </div>
    </div>
  )
}

