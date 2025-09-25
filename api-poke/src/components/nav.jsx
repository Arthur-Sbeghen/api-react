import "../components/css/nav.css";

const Nav = ({ searchTerm, setSearchTerm, randomPokemon }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Procure por nome ou número"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        className="random-button"
        title="10% de chance de aparecer uma forma alternativa!"
        onClick={randomPokemon}
      >
        Pokémon Aleatório
      </button>
    </div>
  );
};

export default Nav;
