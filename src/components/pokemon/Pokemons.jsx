import React, { useState, useEffect } from "react";
import PokemonCard from "../pokemon/PokemonCard";
import classes from "../pokemon/Pokemons.scss";

const Pokemons = () => {
  const [pokemon, setPokemon] = useState({
    url: "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=200",
    pokemons: null,
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const pokemonResult = await fetch(pokemon.url);
        const pokemonData = await pokemonResult.json();
        setPokemon({
          ...pokemon,
          pokemons: pokemonData,
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  console.log(pokemon);
  return (
    <div className="MainContainer">
      <div className="cardContainer">
        <div className="pokemonsContainer">
          {pokemon.pokemons ? (
            pokemon.pokemons.results.map((pokemon) => {
              return (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              );
            })
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pokemons;
