import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs'
import { MovieCard } from "../components/MovieCard";

import './Movie.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movie = () => {
  // Está pegando o id que fica na url.
  const {id} = useParams();
  const [movie, setMovie] = useState(null);

  // Está fazendo o fetch
  const getMovie = async(url) => {
    const res = await fetch(url);
    const data = await res.json();
    // está jogando o fetch já concluído no useState, para poder usar ele no map.
    // Não precisa do results, porque só está pegando 1 filme.
    setMovie(data);
  }

  const formatCurrency = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  useEffect(() => {
    // Está montando a url que chama o vídeo individualmente.
    const movieUrl = `${moviesURL}${id}?${apiKey}&language=pt-BR`
    getMovie(movieUrl)
  }, [])

  return (
     <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  )
}
