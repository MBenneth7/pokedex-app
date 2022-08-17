import {useState} from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import PokemonSearchResult from "./PokemonSearchResult";
import "./PokedexSearch.css";
import searchIcon from "./assets/images/search.png";

export default function PokedexSearch() {

    const [search, setSearch] = useState("");
    const [pokemon, setPokemon] = useState();
    const [loading, setLoading] = useState(false);

    const baseURL = "https://pokeapi.co/api/v2";
    const queryTypes = {
        pokemon: 'pokemon'
    }

    async function fetchPokemon(pokemon) {
        // console.log(`${baseURL}/${queryTypes.pokemon}`);
        return await axios.get(`${baseURL}/${queryTypes.pokemon}/${pokemon}`);
        // return await axios.get(`${baseURL}/pokemon`)
    }

    function changeImgLink(id){

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

    const getPokemon = async (query) => {

        setLoading(true);

        const res = await fetchPokemon(query);
        const pkm = res.data;
        let name = pkm.species.name.toUpperCase();
        let id = pkm.id;
        let type = [];
        let sprites = [];
        let abilities = [];
        let stats = [];
        let img = changeImgLink(pkm.id);

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

        setPokemon(newPkm);

        console.log(res.data.results);

        setLoading(false);
    }

    //TESTING//

    const getAllPokemon = async()=>{
        const limit = 1154;
        let allPokemon = '';

        await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
        .then((res)=>{
            // console.log(res.data.results);
            const pokemon = res.data.results.map((p)=>{
                const {url} = p;
                const id = url.substring(34, url.length - 1);
                return{
                    ...p,
                    id,
                }
            });
            allPokemon = pokemon;
        });

        return allPokemon;
    }

    const renderPokemon = async() =>{

        setLoading(true);

        const allPkm = await getAllPokemon();
        const displayPkm = [];

        allPkm.forEach((p)=>{
            if(!p.name.includes(search)) return;

            displayPkm.push(
                <li>Name: {p.name}, ID: {p.id}</li>
            )
        })

        setLoading(false);

        return <ul>{displayPkm}</ul>
    }


    /////////////////////////////////////////////////

    return (

        <div className="PokedexSearch">
            <form>
                <input type="text" id="pkm" name="pkm" placeholder="Search for Pokemon"
                    onChange={(e) => {
                        setSearch(e.target.value.toLowerCase().trim());
                    }
                    }
                />
                <button className = "PokedexSearch-btn" onClick={(e) => {
                    getPokemon(search)
                    e.preventDefault();
                }}>
                    <img className = "PokedexSearch-searchIcon" src = {searchIcon} alt = "search-icon"/>
                </button>
            </form>
            <div className="PokedexSearch-results">
                {!loading && pokemon ? (
                    <div>
                        <Pokemon
                            key = {pokemon.id}
                            name = {pokemon.name}
                            img = {pokemon.img}
                            id = {pokemon.id}
                            type = {pokemon.type}
                            sprites = {pokemon.sprites}
                            abilities = {pokemon.abilities}
                            stats = {pokemon.stats}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    )
}