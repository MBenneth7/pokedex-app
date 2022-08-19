import axios from "axios";
import {Component} from "react";
import "./PokemonSearchResult.css"
import unknown from "./assets/images/question-mark.png"

class PokemonSearchResult extends Component{

    constructor(props){
        super(props)
        this.state = {sprite : ""};
    }

    async componentDidMount(){
        try{
            await axios.get(this.props.url)
            .then((res=>{
                this.setState({sprite : res.data.sprites.front_default});
            }))
        }catch(e){
            console.log(e)
        }
    }

    render(){
        return(
            <div className = "PokemonSearchResult">
                <div className = "PokemonSearchResult-info">
                    <p>#{this.props.id}</p>
                    <h4>{this.props.name}</h4>
                </div>
                <div className = "PokemonSearchResult-sprite-container">
                    <img className = "PokemonSearchResult-sprite" src = {this.state.sprite === null ? `${unknown}` : `${this.state.sprite}`} alt = {`${this.props.name}`}/>
                </div>
            </div>
        )
    }

}

export default PokemonSearchResult;
