import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import grass from './grass.png';
import dirt from './dirt.png';
import Toolbar from '../Toolbar/Toolbar'
import { debounce } from 'lodash';
import axios from 'axios';
import { updateUser,updateAfterSave,updateRecent, updateProjects } from '../../ducks/reducer';

export const Loading = styled.div`
    margin-top: 400px;
    text-align: center;
`

const ProjectAndToolbar = styled.div`
display: ${props => props.gridExpand ? 'inline-block' : 'flex'};
transition:all .5s;
`

const ProjectWrap = styled.div`
margin:${props => props.gridExpand ? '130px 0 0 0px' : '130px 0 0 290px'};
transition:all .5s;
width: 100%;
position:${props => props.modalOpen ? "fixed" :"inline"};
cursor: url(${props => props.cursor}), auto;
float:right;
background:green;
overflow-x:auto;
@media(min-width:1490){
    overflow:hidden;
}
`

export const GridContainer = styled.div`
display:grid;
grid-template-columns:minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%) minmax(80px, 6.66%);
padding:2px;
scroll-behavior: smooth;
min-width:80vw;
width:100%;
`
export const GridItem = styled.div`
background-image: url(${props => props.image ? dirt : grass});
display:inline-grid;
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
export const Image = styled.img`
border: none;
border-image: none;
`

const Popup = styled.div`
    position: absolute;
    top: 0;
    background-color: #C5E1A5;
    padding: 4px;
    border-radius: 15px;
`

class Project extends Component {

    state = {
        cursor: '',
        toggleGridWidth: false,
        plants: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
        edit: 1,
        details: debounce((box) => {
            this.setState({ hoverPlantId: box.id })
        }, 1000, { trailing: true, leading: false }),
        hoverPlantId: -1,
        loading: true
    }

    async componentDidMount() {
        const project_id = this.props.match.params.id
        try{
            let userRes = await axios.get('/auth/user')
            this.props.updateUser({id:userRes.data.id,username:userRes.data.username,recentProject:userRes.data.recentProject})
            const res = await axios.post('/api/project/get', { project_id })
            let plant_array = JSON.parse(res.data.project.plant_array);
            this.setState({ plants: plant_array, loading: false })
        }catch(err){
            if(err.response.status !== 200 && err.response.status !== 400){
                this.props.history.push('/')
                setTimeout(()=>{
                    alert(err.response.data.message)
                },500)
            }else if(err.response.status === 400){
                alert(err.response.data.message)
            }
        }
    }
    async componentDidUpdate(prevProps) {
        let { id } = this.props.match.params
        if (prevProps.match.params.id !== id) {
            let project_id = id;
            let res = await axios.post('/api/project/get', { project_id })
            this.setState({ plants: JSON.parse(res.data.project.plant_array) });
        }
    }

    saveProject = async () => {
        const { plants } = this.state;
        const project_id = this.props.match.params.id
        let res = await axios.post(`/api/project/save`, { plants, project_id })
        let index = this.props.projects.findIndex(project => project.id === res.data.project.id);
        this.props.updateRecent(res.data.project.id)
        this.props.updateAfterSave({project:res.data.project,index});
    }

    deleteProject = async () => {
        let { projects, recentProject } = this.props
        if (projects.length > 1) {
            const project_id = this.props.match.params.id
            await axios.post('/api/project/delete', {project_id})
            let mappedProjects = projects.filter((project, i) => {
                return project.id != project_id
            })
            this.props.updateProjects(mappedProjects)
            if (project_id == recentProject && project_id == projects[0].id) {
                this.props.updateRecent(projects[1].id)
                await axios.put('/api/recent', {recent_id: projects[1].id})
            } else if (project_id == this.props.recentProject) {
                this.props.updateRecent(projects[0].id)
                await axios.put('/api/recent', {recent_id: projects[0].id})
            }
            setTimeout(() => {
                this.props.history.push('/dashboard')
            }, 0)
        
        } else {
            alert('You must keep at least one project at a time')
        }
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
            squares[id] = { id: true }
            this.setState({ cursor, plants: squares, edit: 3 })
        } else if (this.state.edit === 3) {
            squares[id] = this.state.cursor
            this.setState({ cursor: { id: 'trowel' }, plants: squares, edit: 2 })
        }
    }

    toggleEdit = () => {
        if (this.state.edit === 1) {
            this.setState({ edit: 2, cursor: { id: 'trowel' } })
        } else {
            this.setState({ edit: 1, cursor: {} })
        }
    }

    cancelHover = () => {
        this.state.details.cancel()
        this.setState({ hoverPlantId: -1 })
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
                    <GridItem key={i} image={this.state.plants[i].id} onClick={() => this.imageUpdater(i)} onMouseLeave={() => { this.cancelHover() }} onMouseEnter={() => { this.state.details(box) }}>

                        <Image src={`./assets/40x40/${box.id}.png`} alt='' />

                        <Popup>{box.name}</Popup>
                    </GridItem>
                )
            } else {
                return (
                    <GridItem key={i} image={this.state.plants[i].id} onClick={() => this.imageUpdater(i)} onMouseLeave={() => { this.cancelHover() }} onMouseEnter={() => { this.state.details(box) }}>

                        <Image src={`./assets/40x40/${box.id}.png`} alt='' onMouseEnter={() => { this.state.details(box) }} />
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
        const plantObj = {
            id: obj.id,
            name: obj.name
        }
        this.setState({ cursor: plantObj })
    }
    toggleGridWidth = () => {
        this.setState({ toggleGridWidth: !this.state.toggleGridWidth })
    }
    render() {
        if (this.state.loading) {
            return (
                <Loading><h1>Loading...</h1></Loading>
            )
        }
        return (
            <ProjectAndToolbar>

                <Toolbar save={this.saveProject} delete={this.deleteProject} toggleGrid={this.toggleGridWidth} edit={this.toggleEdit} cursorProp={(cursor) => this.cursorProp(cursor)} cursor={id => this.updateCursor(id)} editState={this.state.edit} />

                <ProjectWrap modalOpen={this.props.plantModalOpen} cursor={`./assets/40x40/${this.state.cursor.id}.png`} gridExpand={this.state.toggleGridWidth}>
                    <GridContainer>
                        {Array.isArray(this.state.plants) ? this.getBoxes() : null}
                    </GridContainer>
                </ProjectWrap>
            </ProjectAndToolbar>
        );
    }
}

function mapStateToProps(state) {
    return { ...state }
}

export default connect(mapStateToProps, { updateUser,updateRecent, updateAfterSave, updateProjects })(Project);
