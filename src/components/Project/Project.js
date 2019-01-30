import React, { Component } from 'react';
import tomato from './tomato.png';
import smallTomato from './smallTomato.png';
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
const Image = styled.img`
border: none;
border-image: none;
`

class Project extends Component {

    state = {
        cursor: '',
        images: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        edit: 1
    }

    imageUpdater = (id) => {
        let squares = [...this.state.images]
        if (this.state.edit === 1) {
            squares[id] = this.state.cursor
            this.setState({
                images: squares
            })
        } else if (this.state.edit === 2) {
            let cursor = squares[id];
            squares[id] = true
            this.setState({cursor, images: squares, edit: 3})
        } else if (this.state.edit === 3) {
            let cursor = ''
            squares[id] = this.state.cursor
            this.setState({cursor, images: squares, edit: 2})
        }
    }

    getBoxes = () => {
        const boxes = this.state.images.map((box, i) => {
            return (
                <GridItem key={i} image={this.state.images[i]} onClick={() => this.imageUpdater(i)}>
                    
                    <Image src={this.state.images[i]} alt='' />
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
                <button onClick={() => this.setState({cursor: smallTomato})}>Tomato</button>
                <button onClick={() => this.setState({cursor: ''})}>Grass</button>
                <button onClick={() => this.setState({cursor: true})}>Dirt</button>
                <button onClick={() => this.setState({edit: 2, cursor: 'pointer'})}>Toggle Edit</button>
                <h1>HELLO</h1>
                <GridContainer>
                    {this.getBoxes()}
                </GridContainer>
            </ProjectWrap>
        );
    }
}

export default Project;