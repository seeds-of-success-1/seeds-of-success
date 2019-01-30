import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import close from './close-btn.svg';




const Container = styled.div`
position:relative;

`
const SideNav = styled.div`
  transition:all .3s;
  height: ${props => props.open ? '73.2vh' : '0px'};
  width: ${props => props.open ? '250px' : '0px'};
  position: fixed;
  margin-top:130px;
  z-index: 0;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  padding-top: 20px;
`
const NavToolbox = styled.div`
height:10%;
border-bottom: solid 1px black;
display:flex;
justify-content:flex-start;
align-items:flex-end;

`
const ToolboxItem = styled.h6`
padding:0;
margin:0 10px;
font-size:1.5em;
font-weight:400;
cursor: pointer;
:nth-child(2){
    position:relative;
    left:60px;
}
&:hover{
    background-color: #ddd;
}
`
const NavList = styled.ul`
padding:0;
margin:0;
`
const NavListItem = styled.li`
padding:5px;
margin:0;
list-style-type:none;
width:100%;
display:inline-block;
:hover {
    cursor: pointer;
    background-color: #ddd;
};

`
const ListItemTitle = styled.p`
    font-size:1.6em;
    margin:5px 0 0 30px;
    padding:0;
    position:relative;
    bottom:0px;

`
const ListItemImg = styled.img`
width:35px;
height:35px;
margin:5px 20px 0 5px;
float:left;
`
const Hamburger = styled.div`
 width: 30px;
 position: absolute;
 transition:all .3s;
 transition-duration:.2s;
 height:30px;
 margin:16px;
cursor: pointer;
display:flex;
flex-direction:column;
justify-content:space-between;
&.closed {
    transition:all .3s;
    height:0;
    width:0;
    margin:0;
}
`
const Bar = styled.span`
 display: block;
  /* position: absolute; */
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
left:210px;
bottom:13px ;
`
class Toolbar extends Component {
    state ={
        navOpen:true,
        burgerOpen:false
    }

    openNavAfterBurgerClose = () => {
        this.setState({burgerOpen:false})
        setTimeout(this.toggleNav,500);
    }
    toggleNav = () =>{
     console.log('toggle')
    this.setState({navOpen:!this.state.navOpen,burgerOpen:true})
       if(!this.state.navOpen){
           this.setState({burgerOpen:true})
       }
    }

    render() {
        console.log(this.props)
        return (
            <Container>

                <Hamburger
                onClick={this.openNavAfterBurgerClose}
                className={!this.state.burgerOpen ? 'closed' : null}
                >
                    <Bar/>
                    <Bar/>
                    <Bar/>
                </Hamburger>

            <SideNav open={this.state.navOpen}>
            <CloseBtn
            onClick={this.toggleNav}
            src={close} alt=""/>
                <NavToolbox id='toolbox'>
                    <ToolboxItem>Grass</ToolboxItem>
                    <ToolboxItem>Dirt</ToolboxItem>
                </NavToolbox>
                <NavList>
                    {this.props.state.plants.map(plant =>(
                        <NavListItem key={plant.id} >
                            <ListItemImg src={`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${plant.image_url}`} alt=""/>
                            <ListItemTitle>
                                {plant.name}
                            </ListItemTitle>
                        </NavListItem>
                    ))}
                </NavList>
            </SideNav>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return{state}
}

export default connect(mapStateToProps)(Toolbar);