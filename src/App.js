import React from "react";
import Pokemons from "../src/components/pokemon/Pokemons";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Pokemon from "../src/components/pokemon/Pokemon";
import Nav from "../src/components/navigator/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Nav} />
        <Switch>
          <Route exact path="/" component={Pokemons} />
          <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />{" "}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
