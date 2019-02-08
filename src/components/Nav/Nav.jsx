import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUsername, updateId, updateProjects, cleanUpState, updateUser } from '../../ducks/reducer';
import CreateModal from '../CreateModal/CreateModal'
import axios from 'axios'
import { DeleteBtn } from './../Toolbar/Toolbar';
import Display from './Display'

export const EditInput = styled.input`
font: inherit;
font-weight:350;
width: 58%;
border: 0;
border-radius:5px;
margin-bottom: 3px;
margin-right:8px;
padding: 6px 0 7px;
display: block;
outline: none;
box-sizing: content-box;
background:transparent;
outline: none !important;
caret-color: green;
-webkit-box-shadow: 0px 2px 20px -5px rgba(0,0,0,0.57);
-moz-box-shadow: 0px 2px 20px -5px rgba(0,0,0,0.57);
@media (max-width: 1700px) {
    text-size:1.5rem;
  }
  :focus{
    transition: all 0.4s ease 0s;
    transform:scale(1.1);
    ::placeholder{
        color:#424242;
        font-weight:450;
    }
  }
  @media (max-width: 500px){
    font-size:1rem;
    height:10px;
    margin-left:10px;
    width:25%;
 }
`
const NavWrap = styled.div`
height:130px;
width:100%;
background-color:#DCEDC8;
position:fixed;
top:0;

@media (max-width: 500px){
   max-width:100vw;
   height:90px
}
`
const SiteTitle = styled.h1`
font-size:2em;
color:#558B2F;
text-align: center;
@media (max-width: 500px){
    font-size:1.25rem;
    width:50%;
    position:fixed;
    right:100px
 }
`
const NavButton = styled.button`
margin:0;
border:none;
outline:transparent;
background-color:inherit;
border-radius:50px;
font-size:1.5rem;
outline: none;
:hover {
    cursor: pointer;
    transition: all 0.2s ease 0s;
    transform:scale(1.1);
    font-weight:525;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
    color:#558B2F;
}
@media (max-width: 500px){
    font-size:1rem;

 }
`
const NavList = styled.ul`
padding:0;
margin:0;
position:relative;
top:10px;
display:flex;
justify-content:flex-end;
z-index: 1;
#logout-btn{
    margin-right:auto;
}
@media (max-width: 500px){
    font-size:1rem;
    display:flex;
    flex-direction:column;
    position:fixed;
    top:0px;
    right:1px;
    width:28%;


 }

`
const NavListItem = styled.li`
margin:0 5px;
list-style-type:none;
@media (max-width: 500px){
 }
`
const DropDownMenu = styled.div`
background-color: #DCEDC8;
padding: 0;
height: ${props => props.open ? '100%' : '0px'};
transition:all .4s;
overflow: hidden;
position:relative;
left:4px;
bottom:0px;
display: flex;
flex-direction: column;
justify-content: space-around;
margin-top: 2px;
& a{
    text-decoration:none;
    color:black;
}
`
const DropdownItem = styled.h3`
padding: 0 6px;
margin: 0;
font-weight:500;
:hover {
    cursor: pointer;
    background-color: #AED581;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
}

`

const ProjectTitle = styled.h2`
position: absolute;
top: 5px;
right: 5px;
@media (max-width: 500px){
    font-size:1rem;
    position:absolute;
    left:5px;
    margin-top:1px;
    width:60%;
    text-overflow:none;
    white-space:none;

 }
`
class Nav extends Component {
    state = {
        projects: [{ name: 'Project 1', id: 1 }, { name: 'Project 2', id: 2 }, { name: 'Project 4', id: 4 }],
        projectsOpen: false,
        modalOpen: false,
        edit: false,
        name: ''
    }

    async componentDidMount() {
        try {
            // console.log('hi from nav')
            let res = await axios.get('/auth/user')
            if (res.data.id && !this.props.state.projects.length) {
                this.fetchProjects()
            }
            if (!this.props.id && res.data.id) {
                this.props.updateUser({ id: res.data.id, username: res.data.username, recentProject: res.data.recentProject });
            }
        } catch (err) {
            // console.log('err', err.response)
            if (err.response.status !== 200) {
                this.props.history.push('/')
            }
        }
    }

    fetchProjects = async () => {
        let res = await axios.get('/api/project/projects');
        this.props.updateProjects(res.data.projects)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this.fetchProjects()
        }
        if (this.props.location.pathname.includes('/project') && prevProps.location.pathname !== this.props.location.pathname && this.props.id) {
            let currentProject = this.props.state.projects.filter((project, i) => {
                let project_id = +this.props.location.pathname.slice(8)
                // console.log(project_id)
                return project.id === project_id
            })
            this.setState({ name: currentProject[0].title })
        }
    }

    logout = async () => {
        let res = await axios.get('/auth/logout');
        if (!res.data.loggedIn) {
            this.props.history.push('/');
            this.props.cleanUpState();
        }
    }



    toggleEdit = () => {
        this.setState({ edit: !this.state.edit })
    }

    editName = async () => {
        let currentProject = this.props.state.projects.filter((project, i) => {
                let project_id = +this.props.location.pathname.slice(8)
                return project.id === project_id
            })
        const name = this.state.name || currentProject[0].title
        const project_id = currentProject[0].id
        await axios.post('/api/project/name', { name, project_id })
        const res = await axios.get('/api/project/projects');
        this.props.updateProjects(res.data.projects)
        this.setState({ edit: false })
    }

    handleInputChange = (event) => {
        this.setState({ name: event.target.value })
    }

    getProjects() {
        const mapped = this.props.state.projects.map((project) => {
            return (
                <Link style={{ textDecoration: 'none' }} key={project.id} to={`/project${project.id}`}>
                    <DropdownItem
                        onClick={() => this.setState({ projectsOpen: !this.state.projectsOpen })}
                    >{project.title}</DropdownItem>
                </Link>
            )
        })
        return mapped
    }

    createProject = async (name) => {
        this.setState({ modalOpen: !this.state.modalOpen })
        let res = await axios.post('/api/project/new', { project_name: name })
        let result = await axios.get('/api/project/projects');
        this.props.updateProjects(result.data.projects)
        // console.log('nav create', result.data.projects)
        if (res.data.project.id) {
            this.props.history.push(`/project${res.data.project.id}`)
        }
    }
    onKeyPress=(e)=>{
        if(e.key==="Enter"){
            this.createProject()
        }
    }
    toggleCreateModal = () =>{
        // console.log('TCM')
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    render() {
        let currentProject = this.props.state.projects.filter((project, i) => {
            let project_id = +this.props.location.pathname.slice(8)
            return project.id === project_id
        })
        if (currentProject.length < 1) {
            currentProject = [{title: 'Project'}];
        }


        // console.log(this.props.state.projects)
        const nav = this.props.location.pathname === "/" ?
            null
            : <NavWrap>
                <SiteTitle>Seeds of Success</SiteTitle>
                {
                    this.props.state.projects[0] &&  this.props.location.pathname.includes('/project') ?
                        (
                            <ProjectTitle>
                                <Display
                                save={this.editName}
                                handleInput={this.handleInputChange}
                                editting={this.state.edit}
                                edit={this.toggleEdit}
                                name={this.state.name || currentProject[0].title}
                                >{''+ currentProject[0].title}</Display>
                            </ProjectTitle>
                        )
                     : null
                }
                <NavList>
                    <NavListItem id="logout-btn">
                        <NavButton
                            onClick={this.logout}
                        >Logout</NavButton>
                    </NavListItem>
                    <NavListItem>
                        <NavButton onClick={this.toggleCreateModal}> New</NavButton>
                    </NavListItem>
                    <NavListItem>
                        <Link to="/dashboard">
                            <NavButton>Dashboard</NavButton>
                        </Link>
                    </NavListItem>
                    <NavListItem>
                        <NavButton onClick={() => this.setState({ projectsOpen: !this.state.projectsOpen })}>Projects</NavButton>
                        <DropDownMenu open={this.state.projectsOpen}>{this.props.state.id ? this.getProjects() : null}</DropDownMenu>
                    </NavListItem>
                </NavList>
            </NavWrap>

        return (
            <div>
                {nav}
                <CreateModal
                show={this.state.modalOpen}
                toggleModal={this.toggleCreateModal}
                create={this.createProject}
                onKeyPress={this.onKeyPress}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { state }
}
export default withRouter(connect(mapStateToProps, { updateId, updateUsername, updateProjects, cleanUpState, updateUser })(Nav));