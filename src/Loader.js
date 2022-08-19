import { Component } from "react";
import "./Loader.css"

class Loader extends Component {

    render() {
        return (
            <div className="Loader">
                <svg className="spinner" width="100px" height="100px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

                    <circle cx='50' cy='50' r='45' fill='white' stroke-width='6' stroke='gray'>
                    </circle>
                    <circle cx='50' cy='50' r='15' stroke-width='8' stroke='gray' fill='white'>
                    </circle>
                    <line x1='3' y1='50' x2='35' y2='50' stroke-width='8' stroke='gray'></line>
                    <line x1='65' y1='50' x2='97' y2='50' stroke-width='8' stroke='gray'></line>
                </svg>
            </div>
        )
    }

}

export default Loader;