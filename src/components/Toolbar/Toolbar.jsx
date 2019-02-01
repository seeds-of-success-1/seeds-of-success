import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PlantModal from '../PlantModal/PlantModal'
import close from './close-btn.svg';
import info from './info.svg';



const Container = styled.div`
position:relative;
float:left;
z-index:4;
`
const SideNav = styled.div`
  transition:all .3s;
  height: ${props => props.open ? '100%' : '0px'};
  width: ${props => props.open ? '285px' : '0px'};
  position: fixed;
  margin-top:130px;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-y: hidden;
`
const NavToolbox = styled.div`
height:100px;
width:285px;
border-bottom: solid 1px black;
display:flex;
justify-content:flex-start;
align-items:flex-end;
position:sticky;
z-index:2;
background-color:#ddd;
`
const ToolboxItem = styled.h6`
padding:0;
margin:0 15px;
font-size:1.5em;
font-weight:400;
cursor: pointer;
&:hover{
    background-color: #BBB;
}
`
const NavList = styled.ul`
padding:0;
padding-bottom:260px;
margin:0;
position:relative;
top:10px;
z-index:0;
height:75vh;
overflow:scroll;

`
const NavListItem = styled.li`
padding:5px;
margin:0;
list-style-type:none;
width:90%;
display:flex;
align-items:center;


`
const ListItemTitle = styled.p`
    font-size:1.5em;
    margin:5px 0 0 0px;
    padding:0;
    position:relative;
    bottom:0px;
    width:100%;

`
const ListItemImg = styled.img`
width:35px;
height:35px;
margin:0px 20px 0 0px;
float:left;

`
const ListTitleAndImage = styled.div`
display:flex;
width:90%;
padding:3px;
:hover {
    cursor: pointer;
    background-color: #ddd;
    transition:0.3s;
};
`

const ListItemIcon = styled.img`
width:20px;
height:20px;
padding:10px;
border-radius:50%;
cursor: pointer;
position:absolute;
right:2px;
&:hover {
    background-color: rgba(128,128,128,0.2);
    transition:all .3s;
    transform:translateY(-1px)
};
`
const Hamburger = styled.div`
 width: 30px;
 position: fixed;
 top: 130px;
 transition:all .5s;
 height:30px;
 margin:16px;
 background:#BBB;
 border-radius:5px;
 padding:5px;
cursor: pointer;
display:flex;
flex-direction:column;
justify-content:space-between;
&.closed {
    transition:all .2s;
    height:0;
    width:0;
    margin:0;
}
`
const Bar = styled.span`
 display: block;
  height: 5px;
  width: 100%;
  background: #333;
  border-radius: 9px;
  opacity: 1;
  left: 7px;
:nth-child(1) {
  top: 0px;
}
:nth-child(2) {
  top: 11px;
}
:nth-child(3) {
  top: 22px;
}
`
const CloseBtn = styled.img`
height:30px;
width: 30px;
position:relative;
left:85%;
bottom:65px ;
z-index:3;
`
class Toolbar extends Component {
    state ={
        navOpen:true,
        showingModal:false,
        selectedPlant:{}
    }

    toggleNav = () =>{
        this.setState({navOpen:!this.state.navOpen,burgerOpen:true})
        this.props.toggleGrid()
    }

    toggleModal = () =>{
        this.setState({showingModal:!this.state.showingModal})
    }

    render() {

        return (
            <Container>

                <Hamburger
                onClick={this.toggleNav}
                className={this.state.navOpen ? 'closed' : null}
                >
                    <Bar/>
                    <Bar/>
                    <Bar/>
                </Hamburger>

            <SideNav open={this.state.navOpen}>
                <NavToolbox id='toolbox'>
            <CloseBtn
            onClick={this.toggleNav}
            src={close} alt=""/>
                    {this.props.editState === 1 ? <ToolboxItem style={{zIndex:4}} onClick={this.props.edit}>Edit: off</ToolboxItem> :
                    <ToolboxItem style={{zIndex:4}} onClick={this.props.edit}>Edit: on</ToolboxItem> }
                    <ToolboxItem onClick={() => this.props.cursorProp({})}>Grass</ToolboxItem>
                    <ToolboxItem onClick={() => this.props.cursorProp({id: true})}>Dirt</ToolboxItem>
                </NavToolbox>

                <NavList>
                    {this.props.state.plants.map(plant =>(
                        <NavListItem key={plant.id} >
                        <ListTitleAndImage onClick={() => this.props.cursor(plant)} >
                            <ListItemImg src={`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${plant.image_url}`} alt=""/>
                            <ListItemTitle>
                                {plant.name}
                            </ListItemTitle>
                        </ListTitleAndImage>
                        <ListItemIcon
                        onClick={()=>this.setState({showingModal:!this.state.showingModal,selectedPlant:plant})}
                        src={info} />
                        </NavListItem>
                    ))}
                </NavList>

            </SideNav>
            <PlantModal
            updatePlant={this.updatePlantOnModalClose}
            show={this.state.showingModal}
            plant={this.state.selectedPlant}
            toggleModal={this.toggleModal}
            />
            </Container>
        );
    }
}

function mapStateToProps(state){
    return{state}
}

export default connect(mapStateToProps)(Toolbar);