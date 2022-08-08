import {Component} from "react";
import axios from "axios";
import Pokemon from "./Pokemon";

class Pokedex extends Component{

    constructor(props){
        super(props);
        this.state = {pokemon: {}}
    }

    componentDidMount(){
        this.getPokemon();
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

    async getPokemon(){
        //RETRIEVING INFO & SPRITES

        let description = "";

        await axios.get("https://pokeapi.co/api/v2/pokemon/710")
            .then(res =>{

                let pkm = res.data;
                let name = pkm.species.name;
                let id = pkm.id;
                let type = [];
                let sprites = [];
                let img = this.changeImgLink(pkm.id);
                description = pkm.species.url;

                //DEALING IF POKEMON HAS MULTIPLE TYPES
                if(pkm.types.length < 1){
                    type.push(pkm.types[0].type.name);
                }
                else{
                    for(let t of pkm.types){
                        type.push(t.type.name);
                    }
                }
                //SPRITES
                sprites.push(pkm.sprites.front_default)
                sprites.push(pkm.sprites.front_shiny)
                sprites.push(pkm.sprites.back_default)
                sprites.push(pkm.sprites.back_shiny)

                this.setState({pokemon: {
                    name : name,
                    id : id,
                    type : type,
                    sprites : sprites,
                    img : img
                }})

                axios.get(description)
                    .then(res=>{
                        console.log(res.data.flavor_text_entries[0]);
                        let info = res.data.flavor_text_entries[0].flavor_text;
                        this.setState({pokemon:{...this.state.pokemon, info:info}})
                    })
                    .catch (e=>console.log(e))
            })
            .catch(e => console.log(e));
    }

    renderPokemon(){
        return(
            <div>
                <Pokemon 
                    key = {this.state.pokemon.id}
                    name = {this.state.pokemon.name}
                    img = {this.state.pokemon.img}
                    id = {this.state.pokemon.id}
                    type = {this.state.pokemon.type}
                    info = {this.state.pokemon.info} 
                    sprites = {this.state.pokemon.sprites}
                />
            </div>
        )
    }

    render(){
        return(
            this.renderPokemon()
        )
    }
}

export default Pokedex;