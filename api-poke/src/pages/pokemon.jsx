import { useEffect, useState } from "react";
import axios from "axios";
import "./css/pokemon.css";

const Pokemon = ({ pokemon, onBack }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemon.id]);

  if (loading) {
    return (
      <div className="pokemon-details-loading">
        Carregando detalhes de {pokemon.name}...
      </div>
    );
  }

  const data = details || pokemon;

  return (
    <div className="pokemon-details">
      <button className="back-button" onClick={onBack}>
        &#x2190; Voltar para a Lista
      </button>

      <div className="details-header">
        <h1>{data.name.toUpperCase()}</h1>
        <span className="details-id">
          #
          {String(data.id).length < 3
            ? String(data.id).padStart(4, "0")
            : data.id}
        </span>
      </div>

      <div className="details-main-info">
        <div className="details-img-container">
          <img
            src={data.sprites?.other?.["official-artwork"]?.front_default}
            alt={data.name}
            className="details-img"
          />
        </div>
        <div className="details-types">
          <h2>Tipos</h2>
          {data.types.map((t) => (
            <span key={t.type.name} className={`type-pill type-${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="details-general">
        <h2>Informações Gerais</h2>
        <p>Altura: {(data.height / 10).toFixed(1)} m</p>
        <p>Peso: {(data.weight / 10).toFixed(1)} kg</p>
        <p>
          Habilidades:
          {data.abilities.map((a) => a.ability.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Pokemon;
