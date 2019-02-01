import React, { Component } from 'react';
import styled from 'styled-components';
import {withRouter,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUsername, updateId} from '../../ducks/reducer'
import axios from 'axios'

const NavWrap = styled.div`
height:130px;
width:100%;
background-color:aliceblue;
position:fixed;
top:0;
`
const SiteTitle = styled.h1`
font-size:2em;
color:green;
text-align: center;
`
const NavButton = styled.button`
margin:0;
border:none;
outline:transparent;
background-color:inherit;
font-size:1.5rem;
:hover {
    cursor: pointer;
}
`
 const NavList = styled.ul`
padding:0;
margin:0;
position:relative;
top:16px;
display:flex;
justify-content:flex-end;
z-index: 1;
#logout-btn{
    margin-right:auto;
}
`
const NavListItem = styled.li`
margin:0 5px;
list-style-type:none;
`
const DropDownMenu = styled.div`
background-color: #fff;
padding: 0;
height: ${props => props.open ? '100%' : '0px'};
transition:all .4s;
overflow: hidden;
margin-top: 2px;
`
const DropdownItem = styled.h3`
padding: 0 6px;
margin: 6px 0;
:hover {
    cursor: pointer;
    background-color: #ddd;
}
`

const ProjectTitle = styled.h2`
position: absolute;
top: 5px;
right: 5px;
`
class Nav extends Component {
    state = {
        projects: [{name:'Project 1',id:1}, {name:'Project 2',id:2}, {name:'Project 4',id:4}],
        projectsOpen: false
    }

    logout = async () => {
        let res = await axios.get('/auth/logout');
        if(!res.data.loggedIn){
            this.props.history.push('/')
        }
    }

    getProjects() {
        const mapped = this.props.state.projects.map(project => {
            return (
                <Link key={project.id} to={`/project${project.id}`}>
                    <DropdownItem
                    onClick={()=>this.setState({projectsOpen:!this.state.projectsOpen})}
                    >{project.title}</DropdownItem>
                </Link>
            )
        })
        return mapped
    }

    createProject = async () => {
        let res = await axios.post('/api/project/new')
        if (res.data.project.id) {
            this.props.history.push(`/project${res.data.project.id}`)
        }
    }

    render() {
        let currentProject = this.props.state.projects.filter((project, i) => {
                let project_id = +this.props.location.pathname.slice(8)
                console.log(project_id)
                return project.id === project_id
        })

      const nav = this.props.location.pathname === "/"?
        null
      : <NavWrap>
          <SiteTitle>Seeds of Success</SiteTitle>
            { this.props.location.pathname.includes('/project') ?  <ProjectTitle>{currentProject[0].title}</ProjectTitle> : console.log(this.props.location.pathname) }
          <NavList>
              <NavListItem id="logout-btn">
                  <NavButton
                  onClick={this.logout}
                  >Logout</NavButton>
              </NavListItem>
              <NavListItem>
                  <NavButton onClick={() => this.createProject()}>Create New Project</NavButton>
              </NavListItem>
              <NavListItem>
                  <Link to="/dashboard">
                    <NavButton>Dashboard</NavButton>
                  </Link>
              </NavListItem>
              <NavListItem>
                  <NavButton onClick={() => this.setState({projectsOpen: !this.state.projectsOpen})}>Projects</NavButton>
                <DropDownMenu open={this.state.projectsOpen}>{this.props.state.id ? this.getProjects():null}</DropDownMenu>
              </NavListItem>
          </NavList>
       </NavWrap>

        return (
            <div>
                {nav}
            </div>
            );
    }
}

function mapStateToProps(state){
    return{state}
}
export default withRouter(connect(mapStateToProps,{updateId,updateUsername})(Nav));