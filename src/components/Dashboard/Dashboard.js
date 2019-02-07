import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateRecent, updateId, updateUsername } from '../../ducks/reducer';
import { Loading } from '../Project/Project';
import axios from 'axios';
import grass from '../Project/grass.png';
import dirt from '../Project/dirt.png';
import next from './next.svg';
import before from './before.svg';
import ReactWeather from 'react-open-weather';
import { weatherApiKey } from '../../config';
//Optional include of the default css styles
import 'react-open-weather/lib/css/ReactWeather.css';
import { CloseBtn, SaveBtn } from '../Toolbar/Toolbar';
import close from '../Toolbar/close-btn.svg';
import Articles from '../Articles/Articles'


const MainContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;

`
const DashboardContainer = styled.div`
background:#F1F8E9;
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
height:11vh;
display:flex;
background:#DCEDC8;
justify-content:center;
width:100%;
align-items:center;
color:#558B2F;
z-index:500;
`
const GridContainer = styled.div`
display:grid;
grid-template-columns:minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%);
scroll-behavior: smooth;
justify-content:center;
box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
transition: all 0.4s ease 0s;
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
const Weather = styled.div`
 position: absolute;
 top: 131px;
 right:1px;
 transition: all .2s;
 overflow: ${props => props.open ? 'inherit' : 'hidden'};
 height: ${props => props.open ? '276px' : '0'};
 width: ${props => props.open ? '330px' : '0'};
 z-index: 1;
 .rw-box-days {
     transition: all .5s;
     z-index: -1;
     position:absolute;
     top: ${props => props.forecast ? '276px' : '10px'};
 }
`
const CloseWeather = styled(CloseBtn)`
 z-index:2;
 position: absolute;
 top: 5px;
 left: 5px;
`
const ForecastBtn = styled(SaveBtn)`
background: #4BC4F7;
right: 0;
top: 241px;
height: 35px;
z-index:2;
`
const OpenWeather = styled(ForecastBtn)`
top: 131px;
right: 0;
`
const NewsBtn = styled(ForecastBtn)`
top:131px;
left:0;
`

class Dashboard extends Component {
    state = {
        project: [],
        title: '',
        loading: true,
        weather: false,
        forecast: false,
        showNews:false
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
    toggleWeather = () => {
        this.setState({ weather: !this.state.weather, forecast: false })
    }
    toggleForecast = () => {
        this.setState({forecast: !this.state.forecast})
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.loading && prevState.project.length !== this.state.project.length) {
            let index = null;
            if (this.props.projects.length) {
                index = this.props.projects.findIndex(project => project.id === this.props.recentProject);
                if (index !== -1) {
                    let { title } = this.props.projects[index]
                    let project = JSON.parse(this.props.projects[index].plant_array)
                    this.setState({ project, title })
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
                setTimeout(() => {
                    alert(err.response.data.message)
                }, 500)

            }
        }

    }

    flipThroughProjects = (direction) => {
        const { projects } = this.props;
        let index = projects.findIndex(project => project.id === this.props.recentProject);
        if (index === 0 && direction === 'left') {
            this.setProject(projects.length -1)
        } else if (index === projects.length - 1 && direction === 'right') {
            this.setProject(0)
        } else if (direction === 'left') {
            this.setProject(index - 1)
        } else if (direction === 'right') {
            this.setProject(index + 1)
        }
    }

    setProject = (index) => {
        let project = JSON.parse(this.props.projects[index].plant_array)
        let id = this.props.projects[index].id
        let { title } = this.props.projects[index]
        this.props.updateRecent(id)
        this.setState({ project, title })
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading><h1>Loading...</h1></Loading>
            )
        }
        return (

            <MainContainer>
                    <NewsBtn onClick={()=>this.setState({showNews:!this.state.showNews})} >News</NewsBtn>
                    <Articles show={this.state.showNews} />
                <DashboardContainer>
                    <OpenWeather onClick={this.toggleWeather}>Local Weather</OpenWeather>
                    <Arrows show={this.state.project.length} src={before}
                        onClick={() => this.flipThroughProjects('left')}
                    />
                    <GridContainer>
                        {this.mapProject()}
                    </GridContainer>
                    <Arrows show={this.state.project.length} src={next}
                        onClick={() => this.flipThroughProjects('right')}
                    />
                    <Weather open={this.state.weather} forecast={this.state.forecast}>
                        <ReactWeather
                            forecast="5days"
                            apikey={weatherApiKey}
                            type="auto"
                            unit='imperial'
                        >
                        </ReactWeather>
                        <CloseWeather
                            onClick={this.toggleWeather}
                            src={close} alt="" />
                        <ForecastBtn onClick={this.toggleForecast} >5-Day Forecast</ForecastBtn>
                    </Weather>

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