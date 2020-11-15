import React, { useState, useEffect } from "react";
import styled from "styled-components";
import classes from "../pokemon/PokemonCard.scss";
import { Link } from "react-router-dom";
const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBCDF",
  fairy: "F4b1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

const PokemonCard = (props) => {
  const [pokemonData, setPokemon] = useState({
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    loading: true,
    error: false,
  });
  useEffect(() => {
    const { name, url } = props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = ` https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    setPokemon({
      name: name,
      imageUrl: imageUrl,
      pokemonIndex: pokemonIndex,
    });
  }, []);

  return (
    <Link className="link" to={`pokemon/${pokemonData.pokemonIndex}`}>
      <div className="pokemonCard">
        <h5>{pokemonData.pokemonIndex}</h5>

        {pokemonData.loading ? (
          <div className="lds-dual-ring" />
        ) : (
          <img
            style={{ width: "5em", height: "5em" }}
            src={pokemonData.imageUrl}
            onLoad={() => setPokemon({ ...pokemonData, loading: false })}
            onError={() => setPokemon({ ...pokemonData, error: true })}
            style={
              pokemonData.error
                ? { display: "none" }
                : pokemonData.loading
                ? null
                : { display: "inline" }
            }
          />
        )}

        <h6>
          {pokemonData.name
            .toLowerCase()
            .split(" ")
            .map((pokemon) => {
              return pokemon.charAt(0).toUpperCase() + pokemon.substring(1);
            })
            .join("")}
        </h6>
      </div>
    </Link>
  );
};

export default PokemonCard;
