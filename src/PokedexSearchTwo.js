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
            searchString: "",
            result : false,
            pokemon : {},
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

    changeImgLink(id){

        let stringId = String(id);
        let changeId ="";
        let alteredId = "";

        if(id < 100 && id >= 10){
            changeId = '0';
            alteredId = changeId.concat(stringId);
        }
        else if(id < 10){
            changeId = '00';
            alteredId = changeId.concat(stringId);
        }
        else 
            alteredId = String(id);   

        let newImgLink = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${alteredId}.png`;
        return newImgLink;
    }

    getPokemonDetails(res){

        let pkm = res.data;
        let name = pkm.species.name.toUpperCase();
        let id = pkm.id;
        let type = [];
        let sprites = [];
        let abilities = [];
        let stats = [];
        let img = this.changeImgLink(pkm.id);

        // console.log(pkm.stats);

        //STORING TYPES INTO 'type' ARRAY
        for(let t of pkm.types){
            type.push(t.type.name.toUpperCase());
        }

        //STORING ABILITES INTO 'abilities' ARRAY
        for(let a of pkm.abilities){
            abilities.push(a.ability.name.toUpperCase())
        }

        //STORING STATS INTO 'stats' ARRAY
        for(let s of pkm.stats){
            stats.push({ name: s.stat.name, value: s.base_stat});
        }

        //STORING SPRITES INTO 'sprites' ARRAY
        sprites.push(pkm.sprites.front_default)
        sprites.push(pkm.sprites.front_shiny)
        sprites.push(pkm.sprites.back_default)
        sprites.push(pkm.sprites.back_shiny)

        let newPkm = {
            name: name,
            id: id,
            type : type,
            sprites: sprites,
            img : img,
            abilities : abilities,
            stats : stats
        }

        return newPkm;
    }


    renderPokemon() {

        const displayPkm = [];

        this.state.allPkm.forEach((p) => {
            if (!p.name.includes(this.state.searchString)) return;

            displayPkm.push(
              <button 
                className = "PokedexSearch-result-btn"
                onClick = {async()=>{

                    let pkm = null;

                    try{
                        await axios.get(p.url)
                            .then((res)=>{
                                pkm = this.getPokemonDetails(res);
                                console.log(pkm)
                            })
                    }catch(e){
                        console.log(e);
                    }

                    this.setState({
                        result : true,
                        searchString : "",
                        pokemon : {...pkm}
                    });
                }}
              >  
                <PokemonSearchResult
                    key = {p.id}
                    name = {p.name}
                    id = {p.id}
                    url = {p.url}
                />
              </button>  
            )
        })

        return displayPkm
    }

    renderPokemonCard(){
        return(
            <Pokemon
            key = {this.state.pokemon.id}
            name = {this.state.pokemon.name}
            img = {this.state.pokemon.img}
            id = {this.state.pokemon.id}
            type = {this.state.pokemon.type}
            sprites = {this.state.pokemon.sprites}
            abilities = {this.state.pokemon.abilities}
            stats = {this.state.pokemon.stats}
            />
        )
    }

    handleSearchChange(e) {
        this.setState({ 
            [e.target.name]: e.target.value.toLowerCase().trim(),
            result : false
        });
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
                
                <div className={this.state.searchString === "" ? "PokedexSearch-results-hide" : "PokedexSearch-results"}>
                        {this.state.loading ? <p>loading...</p> : this.renderPokemon()}
                </div>

                <div className = {this.state.searchString === "" && this.state.result === true ? "PokedexSearch-result-card" : "PokedexSearch-result-card-hide"}>
                        {JSON.stringify(this.state.pokemon)!=="{}" ? this.renderPokemonCard() : ""}
                </div>
            </div>
        )
    }
}

export default PokedexSearchTwo;