import { useEffect, useState } from "react";
import axios from "axios";
import "./css/pokedex.css";
import Pagination from "../components/pag";

const Pokedex = ({ searchTerm, onSelectPokemon }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = response.data;

        const detail = data.results.map(async (pk) => {
          const res = await axios.get(pk.url);
          return {
            id: res.data.id,
            name: res.data.name,
            sprite:
              res.data.sprites?.other?.["official-artwork"]?.front_default,
            types: res.data.types.map((t) => t.type.name),
          };
        });

        const pokes = await Promise.all(detail);
        setPokemons(pokes);
      } catch (err) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, [offset]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResult(null);
      return;
    }

    const timer = setTimeout(async () => {
      const query = searchTerm.trim().toLowerCase();
    
      if (!query) {
        setSearchResult(null);
        return;
      }
    
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${query}`
        );
    
        if (res.status === 200) {
          setSearchResult({
            id: res.data.id,
            name: res.data.name,
            sprite: res.data.sprites?.other?.["official-artwork"]?.front_default,
            types: res.data.types.map((t) => t.type.name),
          });
        }
      } catch {
        setSearchResult(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const firstPage = () => {
    setOffset(0);
  };

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - limit));
  };

  const lastPage = () => {
    setOffset(1302 - limit);
  };

  const handleCardClick = (pokemonData) => {
    onSelectPokemon(pokemonData);
  };

  return (
    <div className="pokedex">
      {loading ? (
        <div className="pokedex-loading">Carregando Pokémons...</div>
      ) : error ? (
        <div className="pokedex-error">Erro: {error}</div>
      ) : searchResult ? (
        <ul className="pokedex-grid">
          <li
            className="pokedex-card"
            key={searchResult.id}
            onClick={() => handleCardClick(searchResult)}
          >
            <div className="card-badge">
              #
              {String(searchResult.id).padStart(4, "0")}
            </div>
            <div className="card-img-container">
              <img
                src={searchResult.sprite}
                alt={searchResult.name}
                className="card-img"
              />
            </div>
            <div className="card-body">
              <h2 className="card-name">{searchResult.name}</h2>
              <div className="card-types">
                {searchResult.types.map((t) => (
                  <span key={t} className={`type-pill type-${t}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <>
          <ul className="pokedex-grid">
            {pokemons.map((p) => (
              <li
                className="pokedex-card"
                key={p.id}
                onClick={() => handleCardClick(p)}
              >
                <div className="card-badge">
                  #
                  {String(p.id).padStart(4, "0")}
                </div>
                <div className="card-img-container">
                  <img
                    src={p.sprite}
                    alt={`${p.name} sprite`}
                    className="card-img"
                  />
                </div>
                <div className="card-body">
                  <h2 className="card-name">{p.name}</h2>
                  <div className="card-types">
                    {p.types.map((t) => (
                      <span key={t} className={`type-pill type-${t}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            onFirstClick={firstPage}
            onPreviousClick={handlePreviousPage}
            onNextClick={handleNextPage}
            onLastClick={lastPage}
          />
        </>
      )}
    </div>
  );
};

export default Pokedex;
