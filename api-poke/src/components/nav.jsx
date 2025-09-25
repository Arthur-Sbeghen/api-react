import "../components/css/nav.css";

const Nav = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search Pokémon by name or number"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button className="random-button" title="Sortear um Pokémon aleatório">
        Random Pokémon
      </button>
    </div>
  );
};

export default Nav;
