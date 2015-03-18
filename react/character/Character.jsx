import React from "react";
import "./characterStyle.css";

class Character extends React.Component {
    constructor (props) {
        this.x_speed = 0;
        this.y_speed = 0;
        this.jumpable = true;
        this.platforms = [];
        this.state = {
            x: 50,
            y: 0,
            moving: false
        }
    }
    componentDidMount(){
        this.refs.focus.getDOMNode().focus();
    }

    componentWillReceiveProps(props){
        props.platforms.forEach((item)=>{
            var platObj = {
                y: Number(item.bottom.split("p")[0]) + Number(item.height.split("p")[0]),
                y_bottom: Number(item.bottom.split("p")[0]) - Number(item.height.split("p")[0]),
                x_min: Number(item.left.split("p")[0]),
                x_max: Number(item.left.split("p")[0]) + Number(item.width.split("p")[0])
            };
            this.platforms.push(platObj, "this is it");
        });
    }

    getDefaultProps(){
        return {
            friction: 1.3
        }
    }


    input(e){
        switch(e.keyCode){
            case 39:
                this.move("right");
                break;
            case 37:
                this.move("left");
                break;
            case 32:
                this.jump();
                break;
        }
    }


    jump () {
        if(this.jumpable){
            this.y_speed = 40;
            this.renderMovement();
            this.jumpable = false;
        }
    }
    renderMovement(){
        if(!this.state.moving){


            var movement = ()=>{
                var y_bottom = 0;
                this.platforms.forEach((platform)=>{
                    if(this.state.x > (platform.x_min - Number(this.refs.character.props.style.width.split("p")[0])) && this.state.x < platform.x_max && this.state.y >= platform.y){
                        platform.y > y_bottom ? y_bottom = platform.y : null
                    }
                });
                this.setState({
                    moving: true,
                    x: this.state.x + this.x_speed,
                    y: this.state.y + this.y_speed
                }, ()=>{
                    this.x_speed = this.jumpable == true ? this.x_speed / 1.1 : this.x_speed / 1.02;
                    if(this.state.y <= y_bottom){
                        this.y_speed = 0;
                        this.jumpable = true;
                        this.setState({
                            y: y_bottom
                        })
                    }
                    else {
                        this.y_speed -= 5;
                    }
                });
                if(this.x_speed < 1 && this.x_speed > -1){
                    this.x_speed = 0;
                }
                if(!this.y_speed && !this.x_speed && this.state.y <= y_bottom){
                    if(moveInt){
                        clearInterval(moveInt);
                        this.setState({
                            moving: false
                        })
                    }
                }
            };
            movement();
            var moveInt = setInterval(movement, 30)
        }
    }

    move(direction) {
        direction === "right" ? this.x_speed += 10 : this.x_speed-= 10;
        this.renderMovement();
    }

    render () {

        return (
            <div>
                <input ref="focus" onKeyDown={this.input.bind(this)}/>
                <div ref="character" className="character" style={{bottom: this.state.y + "px", left: this.state.x + "px", width: this.props.width + "px"}}>
                </div>
                <button onClick={this.jump.bind(this)}>A Word</button>
            </div>
        )
    }

}


export { Character };