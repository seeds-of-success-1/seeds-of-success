import React, { Component } from 'react';

class Carousel extends Component {
    render() {
        return (
            <>
                {this.props.children}
            </>

        );
    }
}

export default Carousel;