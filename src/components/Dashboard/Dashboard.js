import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateRecent } from '../../ducks/reducer';
import axios from 'axios';
import grass from '../Project/grass.png';
import dirt from '../Project/dirt.png';

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
justify-content:space-around;
align-items:center;
max-height:100vh;
`
const Footer = styled.div`
height:10vh;
background:darkgrey;
justify-content:center;
width:100%;
`
const GridContainer = styled.div`
display:grid;
grid-template-columns:minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%) minmax(40px, 3.66%);
padding:2px;
scroll-behavior: smooth;
min-width:80vw;
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
class Dashboard extends Component {
    state = {
        project: []
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
    async componentDidMount() {
        let res = await axios.get('/auth/user')
        this.props.updateRecent(res.data.recentProject)

        let projectRes = await axios.post('/api/project/get', { project_id: this.props.recentProject })
        this.setState({ project: JSON.parse(projectRes.data.project.plant_array) })
    }
    render() {

        return (
            <MainContainer>
                <DashboardContainer>
                    Lettuce begin
                    <GridContainer>
                        {this.mapProject()}
                    </GridContainer>
                </DashboardContainer>
                <Footer>Currently displayed project title</Footer>
            </MainContainer>
        );
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps, { updateRecent })(Dashboard);