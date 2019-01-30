import React, { Component } from 'react';
import tomato from './Tomato2.png';
import styled from 'styled-components';
import grass from './grass.png';
import dirt from './dirt.png';

const ProjectWrap = styled.div`
margin: 130px 0 0 270px;
cursor: url(${props => props.cursor}), auto;
`

const GridContainer = styled.div`
display:grid;
/* grid-gap: 1px 3px; */
grid-template-columns:80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px;
padding:2px;
scroll-behavior: smooth;
`
const GridItem = styled.div`
background-image: url(${props => props.image ? dirt : grass});
display:inline-grid;
/* border:1px solid rgba(0,0,0,.2); */
margin: 0;
text-align:center;
height: 80px;
width: 80px;
display: flex;
align-items: center;
justify-content: center;
:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props => props.image ? dirt : grass});
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
                <button onClick={() => this.setState({cursor: tomato})}>Tomato</button>
                <button onClick={() => this.setState({cursor: ''})}>Grass</button>
                <button onClick={() => this.setState({cursor: ' '})}>Dirt</button>
                <h1>HELLO</h1>
                <GridContainer>
                    {this.getBoxes()}
                </GridContainer>
            </ProjectWrap>
        );
    }
}

export default Project;