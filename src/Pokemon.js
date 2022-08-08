import {Component} from "react";
import "./Pokemon.css";
import unknown from "./assets/images/question-mark.png"

class Pokemon extends Component{

    render(){

        //GIVE TIME FOR DATA TO RENDER BEFORE COMPONENT MOUNTS
        let types = this.props.type ? this.props.type.join(" ") : "";
        let sprites = this.props.sprites ? this.props.sprites.map((s,i)=>{
            if(s !== null) return <img className = "Pokemon-sprites"  src = {s} alt = {`${this.props.name}-${i}`}/>
            else return <img className = "Pokemon-unknown" src = {unknown} alt = {`${this.props.name}-${i}`}/>
        }) : ""; 
        //////////////////////////////////////////////////////

        return(
            <div className = "Pokemon">
                <div>
                    <h2>#{this.props.id}</h2>
                    <h1>{this.props.name}</h1>
                </div>
                <h3>{types}</h3>
                <div className = "Pokemon-img">
                    <img src = {this.props.img} alt = {`${this.props.name}-img`}/>
                </div>
                <div className = "Pokemon-sprite-container">
                    {sprites}
                </div>
            </div>
        )
    }
}

export default Pokemon;