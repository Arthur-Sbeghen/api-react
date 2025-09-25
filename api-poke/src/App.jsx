import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";
import Nav from "./components/nav";
import Pokedex from "./pages/pokedex";
import Pokemon from "./pages/pokemon";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSelectPokemon = (pokemonData) => {
    setSelectedPokemon(pokemonData);
  };

  const handleBackToList = () => {
    setSelectedPokemon(null);
  };

  return (
    <>
      <Header />
      <Main>
        {selectedPokemon ? (
          <Pokemon pokemon={selectedPokemon} onBack={handleBackToList} />
        ) : (
          <>
            <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Pokedex
              searchTerm={searchTerm}
              onSelectPokemon={handleSelectPokemon}
            />
          </>
        )}
      </Main>
      <Footer />
    </>
  );
}

export default App;
