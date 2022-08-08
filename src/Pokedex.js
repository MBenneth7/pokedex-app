import {Component} from "react";
import axios from "axios";
import Pokemon from "./Pokemon";


class Pokedex extends Component{

    static defaultProps = {
        maxPkm : 10
    }

    constructor(props){
        super(props);
        this.state = {pokemonArr: []}
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

        try{
            const maxPkm = 905;
            let pkmList = [];

            while(pkmList.length < this.props.maxPkm){

                let randomPkm = Math.floor((Math.random()*maxPkm)+1);

                await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPkm}`)
                    .then(res =>{
                        let pkm = res.data;
                        let name = pkm.species.name.toUpperCase();
                        let id = pkm.id;
                        let type = [];
                        let sprites = [];
                        let img = this.changeImgLink(pkm.id);

                        //DEALING IF POKEMON HAS MULTIPLE TYPES
                        if(pkm.types.length < 1){
                            type.push(pkm.types[0].type.name.toUppercase());
                        }
                        else{
                            for(let t of pkm.types){
                                type.push(t.type.name.toUpperCase());
                            }
                        }
                        //SPRITES
                        sprites.push(pkm.sprites.front_default)
                        sprites.push(pkm.sprites.front_shiny)
                        sprites.push(pkm.sprites.back_default)
                        sprites.push(pkm.sprites.back_shiny)

                        let newPkm = {
                            name: name,
                            id: id,
                            type : type,
                            sprites: sprites,
                            img : img
                        }

                        //PREVENTING STORAGE OF DUPLICATES
                        
                        if(!pkmList.some(el => el.id === newPkm.id)) pkmList.push(newPkm)
                        else console.log("Found Duplicates");
                })
            }// END OF WHILE
            this.setState({pokemonArr : pkmList})

        }catch(e){
            console.log(e);
        }

    } //END OF getPokemon()
    
    renderPokemon(){
        return(
            this.state.pokemonArr.map(p=>(
            <Pokemon 
                key = {p.id}
                name = {p.name}
                img = {p.img}
                id = {p.id}
                type = {p.type}
                sprites = {p.sprites}
             />
             ))
        )     
    }

    render(){

        return(
            this.renderPokemon()
        )
    }
}

export default Pokedex;