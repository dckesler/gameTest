import React from "react";

import { Character } from "./character/Character";
import { Platform } from "./platform/Platform";

var App = React.createClass ({
    getInitialState() {
        return {
            platforms: []
        }
    },
    platTrack: [],

    addPlatform(platform){
        this.platTrack.push(platform);
        this.setState({
            platforms: this.platTrack
        }, ()=>{
            console.log(this.state.platforms);
        })
    },

    render() {
        return (
            <div>
                <Character width={50} friction={1.1} platforms={this.state.platforms} />
                <Platform addPlatform={this.addPlatform} width="200px" left="600px" bottom="100px" />
                <Platform addPlatform={this.addPlatform} width="200px" left="400px" bottom="200px" />
                <Platform addPlatform={this.addPlatform} width="200px" left="700px" bottom="300px" />
            </div>
        )
    }
});

React.render(<App />, document.getElementById("app"));