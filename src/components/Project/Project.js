import React, { Component } from 'react';
import styled from 'styled-components';
import grass from './grass.png';
import dirt from './dirt.png';
import trowel from './trowel.png';
import Toolbar from '../Toolbar/Toolbar';

const ProjectAndToolbar = styled.div`
display: flex;
`

const ProjectWrap = styled.div`
margin: 130px 0 0 270px;
width: 100%;
cursor: url(${props => props.cursor}), auto;
`

const GridContainer = styled.div`
display:grid;
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
            this.setState({ cursor, images: squares, edit: 3 })
        } else if (this.state.edit === 3) {
            squares[id] = this.state.cursor
            this.setState({ cursor: trowel, images: squares, edit: 2 })
        }
    }

    toggleEdit = () => {
        if (this.state.edit === 1) {
            this.setState({ edit: 2, cursor: trowel })
        } else {
            this.setState({ edit: 1, cursor: '' })
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

    updateCursor = (id) => {
        this.setState({cursor: `./assets/40x40/${id}.png`})
    }

    render() {
        return (
            <ProjectAndToolbar>
                <Toolbar cursor={id => this.updateCursor(id)} />
                <ProjectWrap cursor={this.state.cursor}>
                    <button onClick={() => this.setState({ cursor: 'https://image.flaticon.com/icons/png/128/271/271439.png' })}>carrot</button>
                    <button onClick={() => this.setState({ cursor: 'https://image.flaticon.com/icons/png/128/1135/1135528.png' })}>leek</button>
                    <button onClick={() => this.setState({ cursor: './assets/40x40/5.png' })}>Asparagus</button>
                    <button onClick={() => this.setState({ cursor: '' })}>Grass</button>
                    <button onClick={() => this.setState({ cursor: true })}>Dirt</button>
                    <button onClick={() => this.toggleEdit()}>Toggle Edit</button>
                    <h1>HELLO</h1>
                    <GridContainer>
                        {this.getBoxes()}
                    </GridContainer>
                </ProjectWrap>
            </ProjectAndToolbar>
        );
    }
}

export default Project;