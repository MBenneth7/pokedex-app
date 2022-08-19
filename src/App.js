import { Route, Switch, NavLink } from "react-router-dom";
import Pokedex from './Pokedex';
import PokedexSearch from "./PokedexSearch";
import './App.css';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path = '/' component = {Pokedex}/>
        <Route exact path = '/search' component= {PokedexSearch} />
      </Switch>

      <nav className="App-nav">
        <h1>Pokedex</h1>
        <ul className="App-nav-links">
          <NavLink exact activeClassName = "active-link" to = "/search" className="App-nav-link">Search</NavLink>
          <NavLink exact activeClassName = "active-link" to = "/" className = "App-nav-link">Random</NavLink>
        </ul>
      </nav>

    </div>
  );
}

export default App;
