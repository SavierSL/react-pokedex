import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import classes from "../pokemon/Pokemon.scss";

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

class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      atk: "",
      defense: "",
      speed: "",
      specialatk: "",
      specialDefense: "",
    },
    height: "",
    weight: "",
    eggGroupd: "",
    abilities: "",
    genderRatoMale: "",
    genderRatioFemale: "",
    evs: "",
    hathcSteps: "",
  };
  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;
    console.log(pokemonIndex);

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;
    this.setState({ ...this.state, imageUrl: imageUrl, name: name });
    let { hp, atk, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          atk = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
      }
    });
    //convert decimeters to feet
    const height = Math.round(pokemonRes.data.height * 0.328004 + 0.0001 * 100);
    const weight = Math.round(pokemonRes.data.height * 0.220462 + 0.0001 * 100);
    const types = pokemonRes.data.types.map((type) => {
      return type.type.name;
    });
    const abilities = pokemonRes.data.abilities.map((ability) => {
      return ability.ability.name
        .toLowerCase()
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1));
    });
    const evs = pokemonRes.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name}`;
      });

    //get pokemon description
    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });
      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const cacthRate = Math.random(100 / 255) * res.data["capture_rate"];

      const eggGroup = res.data["egg_groups"].map((groupd) => {
        return groupd.name;
      });
      const hathcSteps = 255 * (res.data["hatch_counter"] + 1);
      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        cacthRate,
        eggGroup,
        hathcSteps,
      });
    });
    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        atk,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      height,
      weight,
      abilities,
      evs,
    });
  }

  render() {
    const newAbilites = [...this.state.abilities];
    const pokemonAbilities = newAbilites
      .join(" ")
      .split(/(?=[A-Z][a-z])/)
      .join(" ");
    console.log(pokemonAbilities);
    return (
      <div className="pokemonContainer">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-5">
                  <h5>{this.state.pokemonIndex}</h5>
                </div>
                <div className="col-7">
                  <div className="float-right">
                    {this.state.types.map((type) => {
                      return (
                        <span
                          style={{
                            backgroundColor: `#${TYPE_COLORS[type]}`,
                            color: "white",
                          }}
                          key={type}
                          className="badge badge-primary badge-pill mr-1"
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img
                    src={this.state.imageUrl}
                    alt=""
                    className="card-img-top rounded mx-auto mt-2"
                  />
                </div>
                <div className="col-md-9">
                  <h4 className="mx-auto">{this.state.name}</h4>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">HP</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{
                            width: `${this.state.stats.hp}%`,
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.hp}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">ATK</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{
                            width: `${this.state.stats.atk}%`,
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.atk}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">DEF</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{
                            width: `${this.state.stats.defense}%`,
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.defense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">SPD</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{
                            width: `${this.state.stats.speed}%`,
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.speed}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special atk</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{
                            width: `${this.state.stats.specialAttack}%`,
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.specialAttack}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special def</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          style={{
                            width: `${this.state.stats.specialDefense}%`,
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{this.state.stats.specialDefense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <p className="p-3">{this.state.description}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <div className="car-title text-center">
                <h5>Profile</h5>
                <div className="col" style={{ display: "flex" }}>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">Height:</h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">{this.state.height} ft.</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">Weight:</h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">{this.state.weight} lbs.</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">Catch Rate:</h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">{this.state.cacthRate}%</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">Gender Ratio:</h6>
                      </div>
                      <div className="col-md-6">
                        <div class="progress">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            aria-valuenow="70"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "64%", background: "red" }}
                          ></div>
                          <div
                            class="progress-bar"
                            role="progressbar"
                            aria-valuenow="70"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "36%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">Egg Groups:</h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">{this.state.eggGroup}</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">Hatch Steps:</h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">{this.state.hathcSteps}</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">Abilities:</h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">{newAbilites.join(", ")}</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">Evs:</h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">{this.state.evs}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
