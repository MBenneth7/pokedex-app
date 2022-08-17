import { Component } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import PokemonSearchResult from "./PokemonSearchResult";
import "./PokedexSearch.css";
import searchIcon from "./assets/images/search.png";

class PokedexSearchTwo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            allPkm: [],
            search: ""
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const getAllPokemon = await this.getAllPokemon();
            this.setState({ allPkm: [...getAllPokemon] });
            this.setState({ loading: false });
        } catch (e) {
            console.log(e);
        }
    }

    async getAllPokemon() {
        const limit = 905;
        let allPokemon = null;

        await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
            .then((res) => {
                const pokemon = res.data.results.map((p) => {
                    const { url } = p;
                    const id = url.substring(34, url.length - 1);

                    return {
                        ...p,
                        id,
                    }
                });

                allPokemon = pokemon;
            });

        return allPokemon;
    }


    renderPokemon() {

        const displayPkm = [];

        this.state.allPkm.forEach((p) => {
            if (!p.name.includes(this.state.searchString)) return;

            // displayPkm.push(
            //     <li>Name: {p.name}, ID: {p.id}, url: {p.url}</li>
            // )

            displayPkm.push(
                <PokemonSearchResult
                    key = {p.id}
                    name = {p.name}
                    id = {p.id}
                    url = {p.url}
                />
            )
        })

        return displayPkm
    }

    handleSearchChange(e) {
        this.setState({ [e.target.name]: e.target.value.toLowerCase().trim() });
    }

    render() {
        return (
            <div className="PokedexSearch">
                <form>
                    <input
                        type="text"
                        id="searchString"
                        name="searchString"
                        value={this.state.searchString || ""}
                        placeholder="Search for Pokemon"
                        onChange={this.handleSearchChange}
                    />
                    <button className="PokedexSearch-btn">
                        <img className="PokedexSearch-searchIcon" src={searchIcon} alt="search-icon" />
                    </button>
                </form>
                <div className="PokedexSearch-results">
                        {this.state.loading ? <p>loading...</p> : this.renderPokemon()}
                </div>
            </div>
        )
    }
}

export default PokedexSearchTwo;