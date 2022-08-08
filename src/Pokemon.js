import {Component} from "react";

class Pokemon extends Component{

    render(){

        //GIVE TIME FOR DATA TO RENDER BEFORE COMPONENT MOUNTS
        let types = this.props.type ? this.props.type.join(" ") : "";
        let sprites = this.props.sprites ? this.props.sprites.map((s,i)=>{
            return <img src = {s} alt = {`${this.props.name}-${i}`}/>
        }) : ""; 
        //////////////////////////////////////////////////////

        return(
            <div>
                <h1>{this.props.name}</h1>
                <div>
                    <img src = {this.props.img} alt = {`${this.props.name}-img`}/>
                </div>
                <div>
                    {sprites}
                </div>
                <h2>{this.props.id}</h2>
                <h3>{types}</h3>
                <h4>{this.props.info}</h4>
            </div>
        )
    }
}

export default Pokemon;