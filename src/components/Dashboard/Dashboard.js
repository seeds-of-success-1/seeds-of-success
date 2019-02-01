import React, { Component } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
background:lightgrey;
display:flex;
flex-direction:row;
height:75.5vh;
margin-top:130px;
width:100%;
justify-content:center;
`
const Footer = styled.div`
height:10vh;
background:darkgrey;
justify-content:center;
width:100%;

`

class Dashboard extends Component {
    render() {
        return (
            <>
                <DashboardContainer>
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