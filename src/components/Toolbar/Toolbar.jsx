import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {updateModal} from '../../ducks/reducer'
import PlantModal from '../PlantModal/PlantModal'
import close from './close-btn.svg';
import info from './info.svg';
import toggleOn from './toggle_on.svg'
import toggleOff from './toggle_off.svg'



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
  padding-right:10px;
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
padding-right:10px;
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
:nth-child(3){
    &:hover{
        background:inherit;
    }
}
&:hover{
    background-color: #BBB;
}
`
const SaveBtn = styled.button`
 position:absolute;
 top:5px;
 border-radius:4px;
font-weight:650;
margin-top:10px;
margin-bottom:1px;
min-height:35px;
min-width:55px;
cursor:pointer;
font-weight:650;

`
const DeleteBtnContainer = styled.div`
position: absolute;
top: 2px;
right: 50px;
`
const NavList = styled.ul`
padding:0;
padding-bottom:260px;
margin:0;
position:relative;
top:10px;
z-index:0;
height:72%;
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
 background:transparent;
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
position:absolute;
right:8px;
bottom:65px ;
z-index:3;
`
const EditIcon = styled.img`
height:40px;
width:40px;
position:relative;
top:13px;
`
class Toolbar extends Component {
    state = {
        navOpen: true,
        showingModal: false,
        selectedPlant: {},
        delete: false
    }

    toggleNav = () => {
        this.setState({ navOpen: !this.state.navOpen, burgerOpen: true })
        this.props.toggleGrid()
    }

    toggleModal = (plant) =>{
        this.props.updateModal(!this.props.state.plantModalOpen)
        this.setState({showingModal:!this.state.showingModal,selectedPlant:plant})
    }

    toggleDelete = () => {
        this.setState({ delete: !this.state.delete })
    }
    
    render() {

        return (
            <Container>

                <Hamburger
                    onClick={this.toggleNav}
                    className={this.state.navOpen ? 'closed' : null}
                >
                    <Bar />
                    <Bar />
                    <Bar />
                </Hamburger>

                <SideNav open={this.state.navOpen}>
                    <NavToolbox id='toolbox'>
                        <SaveBtn
                            onClick={this.props.save}
                        >Save</SaveBtn>
                        {this.state.delete ? (<DeleteBtnContainer>
                            Are you sure?
                            <br/>
                            <button onClick={this.props.delete}>Yes</button>
                            <button onClick={this.toggleDelete}>No</button>
                        </DeleteBtnContainer>) : <DeleteBtnContainer><button onClick={this.toggleDelete}>Delete</button></DeleteBtnContainer>}

                        <CloseBtn
                            onClick={this.toggleNav}
                            src={close} alt="" />
                        {this.props.editState === 1 ? <ToolboxItem style={{ zIndex: 4 }} onClick={this.props.edit}>Edit:
                    <span>
                                <EditIcon src={toggleOff} alt="" />
                            </span>
                        </ToolboxItem> :
                            <ToolboxItem style={{ zIndex: 4 }} onClick={this.props.edit}>Edit:
                    <span>
                                    <EditIcon src={toggleOn} alt="" />
                                </span>
                            </ToolboxItem>}

                        <ToolboxItem onClick={() => this.props.cursorProp({})}>Grass</ToolboxItem>
                        <ToolboxItem onClick={() => this.props.cursorProp({ id: true })}>Dirt</ToolboxItem>
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
                        onClick={()=>this.toggleModal(plant)}
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


function mapStateToProps(state) {
    return { state }
}

export default connect(mapStateToProps,{updateModal})(Toolbar);