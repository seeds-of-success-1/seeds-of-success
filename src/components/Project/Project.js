import React, { Component } from 'react';
import styled from 'styled-components';

const ProjectWrap = styled.div`
margin: 130px 0 0 270px;
cursor: url(${props => props.cursor}), auto;
`

const GridContainer = styled.div`
display:grid;
grid-gap: 1px 3px;
grid-template-columns:100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px;
padding:2px;
scroll-behavior: smooth;
`
const GridItem = styled.div`
background-image: url(${props => props.image ? 'https://lh5.googleusercontent.com/-UukByzakIIk/UcmmET4WP2I/AAAAAAAAA_o/PnYv99yZ_ZQ/s256/Enlarged%20Dirt.gif' : 'https://i.cubeupload.com/KB2ChT.png'});
display:inline-grid;
border:1px solid black;
margin: 0;
text-align:center;
height: 100px;
width: 100px;
:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props => props.image ? 'https://lh5.googleusercontent.com/-UukByzakIIk/UcmmET4WP2I/AAAAAAAAA_o/PnYv99yZ_ZQ/s256/Enlarged%20Dirt.gif' : 'https://i.cubeupload.com/KB2ChT.png'});
}
`

class Project extends Component {

    state = {
        cursor: '',
        images: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    }

    imageUpdater = (id) => {
        let squares = [...this.state.images]
        squares[id] = this.state.cursor
        this.setState({
            images: squares
        })
    }

    getBoxes = () => {
        const boxes = this.state.images.map((box, i) => {
            return (
                <GridItem key={i} image={this.state.images[i]} onClick={() => this.imageUpdater(i)}>
                    {i}
                    <img src={this.state.images[i]} alt='' />
                </GridItem>
            )
        })
        return boxes
    }

    render() { 
        return (
            <ProjectWrap cursor={this.state.cursor}>
                <button onClick={() => this.setState({cursor: 'https://image.flaticon.com/icons/png/128/271/271439.png'})}>carrot</button>
                <button onClick={() => this.setState({cursor: 'https://image.flaticon.com/icons/png/128/1135/1135528.png'})}>leek</button>
                <button onClick={() => this.setState({cursor: ''})}>None</button>
                <h1>HELLO</h1>
                <GridContainer>
                    {this.getBoxes()}
                </GridContainer>
            </ProjectWrap>
        );
    }
}

export default Project;