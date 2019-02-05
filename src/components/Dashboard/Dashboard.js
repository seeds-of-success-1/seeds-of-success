import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateRecent, updateId, updateUsername } from '../../ducks/reducer';
import {Loading} from '../Project/Project';
import axios from 'axios';
import grass from '../Project/grass.png';
import dirt from '../Project/dirt.png';
import next from './next.svg';
import before from './before.svg';

const MainContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;

`

const DashboardContainer = styled.div`
background:transparent;
display:flex;
flex-direction:row;
height:75.5vh;
margin-top:130px;
width:100%;
justify-content:center;
align-items:center;
max-height:100vh;

`
const Footer = styled.div`
height:10vh;
display:flex;
background:#F0F8FF;
justify-content:center;
width:100%;
align-items:center;
`
const GridContainer = styled.div`
display:grid;
grid-template-columns:minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%);
padding:2px;
scroll-behavior: smooth;
/* min-width:80vw; */
width:50%;
justify-content:center;
`
const GridItem = styled.div`
background-image: url(${props => props.image ? dirt : grass});
display:inline-grid;
margin: 0;
text-align:center;
height: 40px;
min-height:40px;
width: 100%;
min-width:40px;
display: flex;
align-items: center;
justify-content: center;
position: relative;

`
const Image = styled.img`
border: none;
border-image: none;
width:40px;
`
const ProjectTitle = styled.h1`
padding:0;
margin:0;
position:relative;

`
const Arrows = styled.img`
 display:${props => props.show ? 'inline' : 'none'};
 cursor:pointer;
 width:50px;
 height:50px;
 :hover{
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    transition: all 0.4s ease 0s;
    transform:scale(1.2);
}
`
class Dashboard extends Component {
    state = {
        project: [],
        title:'',
        loading: true,
    }
    mapProject = () => {
        const preview = this.state.project.map((square, i) => {
            return (
                <GridItem image={this.state.project[i].id} key={i}>
                    <Image src={`./assets/40x40/${square.id}.png`} alt=''>
                    </Image>
                </GridItem>
            )
        })
        return preview
    }

    componentDidUpdate(prevProps, prevState){
        if(!this.state.loading && prevState.project.length !== this.state.project.length){
            let index = null;
            if(this.props.projects.length ){
              index = this.props.projects.findIndex(project => project.id === this.props.recentProject);
              if(index !== -1 ){
                  let {title} = this.props.projects[index]
                  let project = JSON.parse(this.props.projects[index].plant_array)
                  this.setState({ project,title})
                }
            }
        }
    }

    async componentDidMount() {
        try{
            let res = await axios.get('/auth/user')
            this.props.updateRecent(res.data.recentProject)
            this.props.updateId(res.data.id)
            this.props.updateUsername(res.data.user_name)
            let projectRes = await axios.post('/api/project/get', { project_id: this.props.recentProject })
            this.setState({ project: JSON.parse(projectRes.data.project.plant_array), loading: false, loggedIn:true });
        }catch(err){
            if(err.response.header !== 200){
                this.props.history.push('/')
               setTimeout(()=>{
                alert(err.response.data.message)
               },500)

            }
        }

    }

    flipThroughProjects = (direction)=>{
        const {projects} = this.props;
       let index = projects.findIndex(project => project.id === this.props.recentProject);
       if(index === 0){
           if(direction ==='left'){return}
           this.setProject(index+2)
       }else if(direction === "left" && index > 0){
           this.setProject(index-1);
        }else if(index === projects.length-1){
            if(direction === 'right'){return}
            this.setProject(index-2);
        }else if(direction === 'right' && index < projects.length){
           this.setProject(index+1);
       }
    }

    setProject = (index) => {
        let project = JSON.parse(this.props.projects[index].plant_array)
        let id  = this.props.projects[index].id
        let {title} = this.props.projects[index]
        this.props.updateRecent(id)
        this.setState({project,title})
    }

    render() {
        console.log('dashboard')
        if (this.state.loading) {
            return (
                <Loading><h1>Loading...</h1></Loading>
                )
            }

        return (

            <MainContainer>
                <DashboardContainer>

                    <Arrows show={this.state.project.length} src={before}
                    onClick={()=>this.flipThroughProjects('left')}
                    />
                    <GridContainer>
                        {this.mapProject()}
                    </GridContainer>
                    <Arrows show={this.state.project.length} src={next}
                    onClick={()=>this.flipThroughProjects('right')}
                    />

                </DashboardContainer>
                <Footer>
                    <ProjectTitle>{this.state.title}</ProjectTitle>
                </Footer>
            </MainContainer>

        );
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps, { updateRecent, updateId, updateUsername })(Dashboard);