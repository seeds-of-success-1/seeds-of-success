import React, { Component } from 'react';
import styled from 'styled-components';
import grass from './grass.png';
import dirt from './dirt.png';
import Toolbar from '../Toolbar/Toolbar'
import {debounce} from 'lodash';


const ProjectAndToolbar = styled.div`
display: ${props => props.gridExpand ?'inline-block':'flex'};
transition:all .5s;
`

const ProjectWrap = styled.div`
margin:${props => props.gridExpand ?'130px 0 0 0px':'130px 0 0 280px'};
transition:all .5s;
/* margin: 130px 0 0 270px; */
width: 100%;
cursor: url(${props => props.cursor}), auto;
float:right;
background:green;
overflow-x:hidden;
`

const GridContainer = styled.div`
display:grid;
/* grid-gap: 1px 3px; */
grid-template-columns:minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%);
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
position: relative;
:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props => props.image ? dirt : grass});
}
`
const Image = styled.img`
border: none;
border-image: none;
`

const Popup = styled.div`
    position: absolute;
    top: 0;
    background-color: white;
    z-index: 2;
    padding: 4px;
    border-radius: 15px;
`

class Project extends Component {

    state = {
        cursor: '',
        toggleGridWidth:false,
        plants: [{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},],
        edit: 1,
        details: debounce((box) => {
            this.setState({hoverPlantId: box.id})
        }, 1000, {trailing: true, leading: false}),
        hoverPlantId: -1
    }

    imageUpdater = (id) => {
        let squares = [...this.state.plants]
        if (this.state.edit === 1) {
            squares[id] = this.state.cursor
            this.setState({
                plants: squares
            })
        } else if (this.state.edit === 2) {
            let cursor = squares[id];
            squares[id] = {id: true}
            this.setState({ cursor, plants: squares, edit: 3 })
        } else if (this.state.edit === 3) {
            squares[id] = this.state.cursor
            this.setState({ cursor: {id: 'trowel'}, plants: squares, edit: 2 })
        }
    }

    toggleEdit = () => {
        if (this.state.edit === 1) {
            this.setState({ edit: 2, cursor: {id: 'trowel'} })
        } else {
            this.setState({ edit: 1, cursor: {} })
        }
    }

    cancelHover = () => {
        this.state.details.cancel()
        this.setState({hoverPlantId: -1})
    }

    getBoxes = () => {
        const boxes = this.state.plants.map((box, i) => {
            if (!box.id || box.id === true) {
                return (
                    <GridItem key={i} image={this.state.plants[i].id} onClick={() => this.imageUpdater(i)}>
                    </GridItem>
                )
            } else if (box.id === this.state.hoverPlantId) {
                return (
                <GridItem key={i} image={this.state.plants[i].id} onClick={() => this.imageUpdater(i)} onMouseLeave={() => {this.cancelHover()}} onMouseEnter={() => {this.state.details(box)}}>

                        <Image src={`./assets/40x40/${box.id}.png`} alt=''  />

                        <Popup>{box.name}</Popup>
                    </GridItem>
                )
            } else {
                return (
                    <GridItem key={i} image={this.state.plants[i].id} onClick={() => this.imageUpdater(i)} onMouseLeave={() => {this.cancelHover()}} onMouseEnter={() => {this.state.details(box)}}>

                        <Image src={`./assets/40x40/${box.id}.png`} alt='' onMouseEnter={() => {this.state.details(box)}}/>
                    </GridItem>
                )
            }
        })
        return boxes
    }

    cursorProp = (obj) => {
        this.setState({
            cursor: obj
        })
    }

    updateCursor = (obj) => {
        console.log(obj)
        this.setState({cursor: obj})
    }
    toggleGridWidth = () =>{
        console.log('hello from grid')
        this.setState({toggleGridWidth:!this.state.toggleGridWidth})
    }
    render() {
        return (
            <ProjectAndToolbar>
                <Toolbar toggleGrid={this.toggleGridWidth} edit={this.toggleEdit} cursorProp={(cursor) => this.cursorProp(cursor)} cursor={id => this.updateCursor(id)} editState={this.state.edit} />
                <ProjectWrap cursor={`./assets/40x40/${this.state.cursor.id}.png`} gridExpand={this.state.toggleGridWidth}>
                    <GridContainer>
                        {this.getBoxes()}
                    </GridContainer>
                </ProjectWrap>
            </ProjectAndToolbar>
        );
    }
}

export default Project;