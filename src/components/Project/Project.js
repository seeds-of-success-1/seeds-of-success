import React, { Component } from 'react';
import styled from 'styled-components';

const ProjectWrap = styled.div`
margin-top: 130px;
cursor: url(${props => props.cursor}), auto;
`

const GridContainer = styled.div`
display:grid;
grid-gap: 15px 15px;
margin-top: 130px;
grid-template-columns:100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px;
padding:2px;
scroll-behavior: smooth;
`
const GridItem = styled.div`
display:inline-grid;
border:1px solid black;
text-align:center;
height: 100px;
width: 100px;
`

class Project extends Component {

    state = {
        cursor: '',
        images: []
    }

    imageUpdater = (id) => {
        let squares = [...this.state.images]
        squares[id] = this.state.cursor
        this.setState({
            images: squares
        })
    }

    render() {
        return (
            <ProjectWrap cursor={this.state.cursor}>
                <h1>HELLO</h1>
                <GridContainer> 
                    <GridItem>1 <img src={this.state.images[0]} alt=''></img> </GridItem>
                    <GridItem>2 <img src={this.state.images[1]} alt=''></img> </GridItem>
                    <GridItem>3 <img src={this.state.images[2]} alt=''></img> </GridItem>
                    <GridItem>4 <img src={this.state.images[3]} alt=''></img> </GridItem>
                    <GridItem>5 <img src={this.state.images[4]} alt=''></img> </GridItem>
                    <GridItem>6 <img src={this.state.images[5]} alt=''></img> </GridItem>
                    <GridItem>7 <img src={this.state.images[6]} alt=''></img> </GridItem>
                    <GridItem>8 <img src={this.state.images[7]} alt=''></img> </GridItem>
                    <GridItem>9 <img src={this.state.images[8]} alt=''></img> </GridItem>
                    <GridItem>10 <img src={this.state.images[9]} alt=''></img> </GridItem>
                    <GridItem>11 <img src={this.state.images[10]} alt=''></img> </GridItem>
                    <GridItem>12 <img src={this.state.images[11]} alt=''></img> </GridItem>
                    <GridItem>13 <img src={this.state.images[12]} alt=''></img> </GridItem>
                    <GridItem>14 <img src={this.state.images[13]} alt=''></img> </GridItem>
                    <GridItem>15 <img src={this.state.images[14]} alt=''></img> </GridItem>
                    <GridItem>16 <img src={this.state.images[15]} alt=''></img> </GridItem>
                    <GridItem>17 <img src={this.state.images[16]} alt=''></img> </GridItem>
                    <GridItem>18 <img src={this.state.images[17]} alt=''></img> </GridItem>
                    <GridItem>19 <img src={this.state.images[18]} alt=''></img> </GridItem>
                    <GridItem>20 <img src={this.state.images[19]} alt=''></img> </GridItem>
                    <GridItem>21 <img src={this.state.images[20]} alt=''></img> </GridItem>
                    <GridItem>22 <img src={this.state.images[21]} alt=''></img> </GridItem>
                    <GridItem>23 <img src={this.state.images[22]} alt=''></img> </GridItem>
                    <GridItem>24 <img src={this.state.images[23]} alt=''></img> </GridItem>
                </GridContainer>
            </ProjectWrap>
        );
    }
}

export default Project;