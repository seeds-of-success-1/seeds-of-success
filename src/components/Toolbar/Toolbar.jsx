import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import close from './close-btn.svg';




const Container = styled.div`
position:relative;
float:left;
z-index:4;
`
const SideNav = styled.div`
  transition:all .3s;
  height: ${props => props.open ? '100%' : '0px'};
  width: ${props => props.open ? '280px' : '0px'};
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
width:280px;
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
margin:0;
position:relative;
top:10px;
z-index:0;
overflow:scroll;
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
    width:100%;
`
const ListItemImg = styled.img`
width:35px;
height:35px;
margin:5px 20px 0 5px;
float:left;
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
    }

    toggleNav = () =>{
        this.setState({navOpen:!this.state.navOpen,burgerOpen:true})
        this.props.toggleGrid()
    }


    render() {
        console.log(this.props)
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
                <div id="nav-ul" style={{overflow:"scroll",height:'100%',zIndex:-1}}>
                <NavList>
                    {this.props.state.plants.map(plant =>(
                        <NavListItem onClick={() => this.props.cursor({id: plant.id, name: plant.name})} key={plant.id} >
                            <ListItemImg src={`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${plant.image_url}`} alt=""/>
                            <ListItemTitle>
                                {plant.name}
                            </ListItemTitle>
                        </NavListItem>
                    ))}
                </NavList>

                </div>
            </SideNav>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return{state}
}

export default connect(mapStateToProps)(Toolbar);