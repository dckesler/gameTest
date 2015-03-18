import React from 'react';
import './Platform.css';

var Platform = React.createClass ({
    componentDidMount(){
        this.props.addPlatform(this.refs.platform.props.style);
    },
    render(){
        return (
            <div ref="platform" className="platform" style={{width: this.props.width, height: '20px', left: this.props.left, bottom: this.props.bottom}}></div>
        )
    }
});

export { Platform };