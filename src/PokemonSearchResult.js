import {Component} from "react";

class PokemonSearchResult extends Component{

    render(){
        return(
            <div className = "PokemonSearchResult">
                {this.props.id} = {this.props.name} = {this.props.sprite}
            </div>
        )
    }

}

export default PokemonSearchResult;
