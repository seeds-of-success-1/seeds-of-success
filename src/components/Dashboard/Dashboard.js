import React, { Component } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
background:lightgrey;
display:flex;
flex-direction:column;
height:75.5vh;
margin-top:130px;

`
const Footer = styled.div`
height:10vh;
background:darkgrey;
justify-content:center;
`
class Dashboard extends Component {
    render() {
        return (
            <>
                <DashboardContainer>
                    <img style={{width:300}} src="https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/harvest_helper_production/02_basil" alt=""/>
                    Lettuce begin
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    [current project]
                </DashboardContainer>
                <Footer>Currently displayed project title</Footer>
            </>
        );
    }
}

export default Dashboard;