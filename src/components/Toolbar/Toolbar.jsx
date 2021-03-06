import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateModal } from '../../ducks/reducer'
import PlantModal from '../PlantModal/PlantModal'
import close from './close-btn.svg';
import info from './info.svg';
import toggleOn from './toggle_on.svg'
import toggleOff from './toggle_off.svg'
import asparagus from './asparagus.png'



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
  background-color: #C5E1A5;
  overflow-y: hidden;
  @media (max-width: 500px){
    /* margin-top:90px; */
 }
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
background-color:#C5E1A5;
@media (max-width: 500px){
    font-size:1rem;
 }
`
const ToolboxItem = styled.h6`
padding:0;
margin:0 15px;
font-size:1.5em;
font-weight:400;
cursor: pointer;
border-radius:50px;
:nth-child(3){
    &:hover{
        background:inherit;
    }
}
&:hover{
    transition: all 0.2s ease 0s;
    font-weight:420;
    color:#7CB342;

}
@media (max-width: 500px){
    font-size:1rem;
 }
`
export const SaveBtn = styled.button`
 position:absolute;
 top:5px;
 border-radius:50px;
font-weight:650;
margin-bottom:1px;
min-height:20px;
min-width:55px;
cursor:pointer;
font-weight:650;
border: none;
outline: none;
color: #fff !important;
background: #8BC34A;
:hover{
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
transition: all 0.4s ease 0s;
}
@media (max-width: 500px){
    font-size:1rem;
 }
`
export const DeleteBtn = styled.button`
 border-radius:50px;
 margin-top:3px;
font-weight:650;
min-height:20px;
min-width:45px;
cursor:pointer;
border: none;
outline: none;
color: #fff !important;
background: #8BC34A;
:hover{
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
transition: all 0.4s ease 0s;
}
@media (max-width: 500px){
    font-size:1rem;
    height:10px
 }
`
const DeleteBtnContainer = styled.div`
position: absolute;
top: 2px;
right: 50px;
`
const NavList = styled.ul`
padding:0;
margin:0;
position:relative;
top:10px;
z-index:0;
height:74.5vh;
overflow-y:scroll;
@media (max-width: 500px){
    font-size:1rem;
 }
`
const NavListItem = styled.li`
padding:5px;
margin:0;
list-style-type:none;
width:90%;
display:flex;
align-items:center;
@media (max-width: 500px){
    font-size:1rem;
 }

`
const ListItemTitle = styled.p`
    font-size:1.5em;
    margin:5px 0 0 0px;
    padding:0;
    position:relative;
    bottom:0px;
    width:100%;
    @media (max-width: 500px){
    font-size:1rem;
 }
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
    background-color: #C5E1A5;
    transition:0.3s;
    border-radius:5px;
    box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;

}
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
    background-color: #8BC34A;
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
:hover{
    transform:scale(1.3)
}
@media (max-width: 500px){
    top:120px;
    height:30px;
    width:30px;
 }
`
const Bar = styled.span`
 display: block;
  height: 5px;
  width: 100%;
  background:#DCEDC8;
  border-radius: 9px;
  opacity: 1;
  left: 7px;
  @media (max-width: 500px){
    height:3px;
 }
`
export const CloseBtn = styled.img`
height:22px;
width: 22px;
position:absolute;
right:8px;
bottom:65px ;
z-index:3;
cursor:pointer;
:hover{
    transition: all 0.4s ease 0s;
    transform:scale(1.3)
}
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

    toggleModal = (plant) => {
        console.log(plant)
        this.props.updateModal(!this.props.state.plantModalOpen)
        this.setState({ showingModal: !this.state.showingModal, selectedPlant: plant })
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
                            <DeleteBtn onClick={this.props.delete}>Yes</DeleteBtn>
                            <DeleteBtn onClick={this.toggleDelete}>No</DeleteBtn>
                        </DeleteBtnContainer>) : <DeleteBtnContainer><DeleteBtn onClick={this.toggleDelete}>Delete</DeleteBtn></DeleteBtnContainer>}

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
                        {this.props.state.plants.map(plant => {
                            if (plant.id === 5) {
                                return (
                                    <NavListItem key={plant.id} >
                                        <ListTitleAndImage onClick={() => this.props.cursor(plant)} >
                                            <ListItemImg src={asparagus} alt={plant.name} />
                                            <ListItemTitle>
                                                {plant.name}
                                            </ListItemTitle>
                                        </ListTitleAndImage>
                                        <ListItemIcon
                                            onClick={() => this.toggleModal(plant)}
                                            src={info} />
                                    </NavListItem>)
                            } else {
                                return (
                                    <NavListItem key={plant.id} >
                                        <ListTitleAndImage onClick={() => this.props.cursor(plant)} >
                                            <ListItemImg src={`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${plant.image_url}`} alt={plant.name} />
                                            <ListItemTitle>
                                                {plant.name}
                                            </ListItemTitle>
                                        </ListTitleAndImage>
                                        <ListItemIcon
                                            onClick={() => this.toggleModal(plant)}
                                            src={info} />
                                    </NavListItem>
                                )
                            }

                        })}
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

export default connect(mapStateToProps, { updateModal })(Toolbar);