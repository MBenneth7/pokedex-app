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
                abilities = {p.abilities}
                stats = {p.stats}
             />
             ))
        )     
    }

    render(){

        return(
            <div className = "Pokedex">
                <h1>POKEDEX</h1>
                {this.renderPokemon()}
            </div>
        )
    }
}

export default Pokedex;