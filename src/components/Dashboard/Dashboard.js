import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateRecent } from '../../ducks/reducer';
import Carousel from '../Carousel/Carousel'
import axios from 'axios';
import grass from '../Project/grass.png';
import dirt from '../Project/dirt.png';
import next from './next.svg'
import before from './before.svg'

const MainContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
`

const DashboardContainer = styled.div`
background:lightgrey;
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
background:darkgrey;
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
:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props => props.image ? dirt : grass});
}
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
left:45px;
`
const Arrows = styled.img`
 display:${props => props.show ? 'inline' : 'none'};
 cursor:pointer;
 width:60px;
 height:60px;
`
class Dashboard extends Component {
    state = {
        project: [],
        title:''
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
        if(prevProps.projects.length !== this.props.projects.length){
            let index = null;
            if(this.props.projects.length && this.props.projects[0].id){
              index = this.props.projects.findIndex(project => project.id == this.props.recentProject);
              let {title} = this.props.projects[index]
              let project = JSON.parse(this.props.projects[index].plant_array)
              this.setState({ project,title})
            }
        }
    }
    async componentDidMount() {
        let res = await axios.get('/auth/user')
        this.props.updateRecent(res.data.recentProject)
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

        return (
            <MainContainer>
                <DashboardContainer>
                    Lettuce begin
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
export default connect(mapStateToProps, { updateRecent })(Dashboard);