import {Component} from "react";
import "./Pokemon.css";
import unknown from "./assets/images/question-mark.png"

class Pokemon extends Component{

    constructor(props){
        super(props);
        this.state = {show: false}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.setState({show: !this.state.show})
    }

    render(){


        //GIVE TIME FOR DATA TO RENDER BEFORE COMPONENT MOUNTS
        let types = this.props.type ? this.props.type.join(" ") : "";
        let sprites = this.props.sprites ? this.props.sprites.map((s,i)=>{
            if(s !== null) return <img className = "Pokemon-sprites"  src = {s} alt = {`${this.props.name}-${i}`}/>
            //IF SPRITE DOESN'T EXIST USE 'unknown' IMAGE INSTEAD
            else return <img className = "Pokemon-unknown" src = {unknown} alt = {`${this.props.name}-${i}`}/>
        }) : "";
        let abilities = this.props.abilities ? this.props.abilities.map((a,i)=>{
            return <div>{a}</div> 
        }) : "";
        let stats = this.props.stats ? this.props.stats.map((s,i)=>{
            return <div>
                        <h4>{s.name}</h4>
                        <p>{s.value}</p>
                   </div>
        }) : "";
        //////////////////////////////////////////////////////

        return(
            <div className = {this.state.show ? "Pokemon-expand" : "Pokemon"}>

                <div className = {this.state.show ? "Pokemon-img-container-show" :"Pokemon-img-container-hide"}>
                    <img className = "Pokemon-img" src = {this.props.img} alt = {`${this.props.name}-img`}/>
                </div>

                <div className ={this.state.show ? "Pokemon-card-show" : "Pokemon-card-hide"}>

                    <div className = "Pokemon-intro">
                        <div className = "Pokemon-info">
                            <h3>#{this.props.id}</h3>
                            <h1>{this.props.name}</h1>
                            <h3 className = "Pokemon-types">{types}</h3>
                        </div>
                        <button onClick = {this.handleClick}>Learn More</button>
                    </div>

                    <div className = {this.state.show ? "Pokemon-details-show" :"Pokemon-details-hide"}>
                        <div className = "Pokemon-sprite-container">
                            {sprites}
                        </div>

                        <div className = "Pokemon-abilities-container">
                            <h2>Abilities</h2>
                            <div className = "Pokemon-abilities">
                                {abilities}
                            </div>
                        </div>

                        <div className = "Pokemon-stats-container">
                            <h2>Stats</h2>
                            <div className = "Pokemon-stats">
                                {stats}
                            </div>
                        </div>

                    </div>     

                </div>
                
            </div> //End of Pokemon div
        )
    }
}

export default Pokemon;