import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import grass from './grass.png';
import dirt from './dirt.png';
import Toolbar from '../Toolbar/Toolbar'
import { debounce } from 'lodash';
import axios from 'axios';
import { updateId, updateUsername, updateRecent,updateAfterSave } from '../../ducks/reducer';

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
    background-color: white;
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
        let userRes = await axios.get('/auth/user')
        this.props.updateRecent(userRes.data.recentProject)
        this.props.updateId(userRes.data.id)
        this.props.updateUsername(userRes.data.username)
        const project_id = this.props.match.params.id
        const res = await axios.post('/api/project/get', { project_id })
        let plant_array = JSON.parse(res.data.project.plant_array);
        if (!res.data.project) {
            return alert("Error.  Couldn't retrive project info")
        } else {
            this.setState({ plants: plant_array, loading: false })
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
        const project_id = this.props.match.params.id
        await axios.post('/api/project/delete', {project_id})
        this.props.history.push('/dashboard')
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

export default connect(mapStateToProps, { updateId, updateUsername, updateRecent, updateAfterSave })(Project);
