import React, { Component } from 'react';
import styled from 'styled-components';
import grass from './grass.png';
import dirt from './dirt.png';
import Toolbar from '../Toolbar/Toolbar'
import trowel from './trowel.png';


const ProjectAndToolbar = styled.div`
display: ${props => props.gridExpand ?'inline-block':'flex'};
transition:all .5s;
`

const ProjectWrap = styled.div`
margin:${props => props.gridExpand ?'130px 0 0 0px':'130px 0 0 270px'};
transition:all .5s;
/* margin: 130px 0 0 270px; */
width: 100%;
cursor: url(${props => props.cursor}), auto;
float:right;
`

const GridContainer = styled.div`
display:grid;
/* grid-gap: 1px 3px; */
grid-template-columns:minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%);
/* grid-template-columns:80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px; */
padding:2px;
scroll-behavior: smooth;
min-width:80vw;
width:100%;
`
const GridItem = styled.div`
background-image: url(${props => props.image ? dirt : grass});
display:inline-grid;
/* border:1px solid rgba(0,0,0,.2); */
margin: 0;
text-align:center;
height: 80px;
min-height:80px;
width: 100%;
min-width:80px;
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
        toggleGridWidth:false,
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

    cursorProp = (cursor) => {
        this.setState({
            cursor: cursor
        })
    }

    updateCursor = (id) => {
        this.setState({cursor: `./assets/40x40/${id}.png`})
    }
    toggleGridWidth = () =>{
        console.log('hello from grid')
        this.setState({toggleGridWidth:!this.state.toggleGridWidth})
    }
    render() {
        return (
            <ProjectAndToolbar>
                <Toolbar toggleGrid={this.toggleGridWidth} edit={this.toggleEdit} cursorProp={(cursor) => this.cursorProp(cursor)} cursor={id => this.updateCursor(id)} />
                <ProjectWrap cursor={this.state.cursor} gridExpand={this.state.toggleGridWidth}>
                    <GridContainer>
                        {this.getBoxes()}
                    </GridContainer>
                </ProjectWrap>
            </ProjectAndToolbar>
        );
    }
}

export default Project;