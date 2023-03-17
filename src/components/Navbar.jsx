import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'

import './Navbar.css';

export const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // Serve para impedir dele de submeter o form(basicamente, ele não envia o formulário), por requisição http(como é o padrão dos forms na web).
    e.preventDefault();

    // Está fazendo o redirecionamento da página de search(Caso a busca seja verdadeira, encontre algo.)
    // Caso tenha algo em search, vai para a rota search, com o nome que foi digitado no input e o que foi escrito foi jogando dentro da variável 'q', para ser pego depois pelo useSearchParams.
    if (!search) return
    navigate(`/search?q=${search}`)
    // Está limpando o campo
    setSearch('')
  }
  return (
    <nav id="navbar">
        <h2>
          <Link to='/'><BiCameraMovie />MoviesLib</Link>
        </h2>
        {/* Quando for clicado vai ativar a função de handleSubmit. */}
          <form onSubmit={handleSubmit}>
            {/* Quando alguém digitar algo no input, está mudando o estado do search, para o que foi digitado. */}
            <input type="text" placeholder='Busque um filme'  onChange={(e) => setSearch(e.target.value)} value={search}/>
            <button type='submit'><BiSearchAlt2 /></button>
          </form>
      </nav>
  )
}
