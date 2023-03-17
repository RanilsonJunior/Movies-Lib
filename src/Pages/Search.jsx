import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { MovieCard } from '../components/MovieCard'

import './MoviesGrid.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export const Search = () => {
  const [searchParams] = useSearchParams()

  const [movies, setMovies] = useState([])

  // Ele consegue pegar qualquer parâmetro que está na URL, e está pegando o que foi escrito no input.
  const query = searchParams.get('q');

  //--------------------------------------Parte igual do componente Home 
   // Está fazendo o fetch
  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    // está jogando o fetch já concluído no useState, para poder usar ele no map.
    setMovies(data.results);
    console.log(movies);
  }

  // O useEffect vai ser renderizado sempre que a página for renderizada.
  useEffect(() => {
    // Está juntando a api com os mais procurados e com a chave da api.
    const searchWithQueryURL = `${searchURL}${apiKey}&query=${query}`;
    // Depois está jogando dentro da função, onde faz o fetch, como parâmetro da url.
    getSearchedMovies(searchWithQueryURL);
  }, [query])


  return (
    <div className="container">
      {/* A query basicamente é o texto que o usuário está buscando. */}
      <h2 className="title">Resultados para: <span className="query-text">{query}</span></h2>
      <div className="movies-container">

        {movies.length > 0 && movies.map((movie) => 
          <MovieCard key={movie.id} movie={movie} />
        )}
      </div>
    </div>
  )
}
