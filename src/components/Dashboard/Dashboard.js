import React, { Component } from 'react';
import styled from 'styled-components';
import Toolbar from '../Toolbar/Toolbar'

const DashboardContainer = styled.div`
background:lightgrey;
display:flex;
flex-direction:column;
height:75.5vh;
margin-top:130px;
width:100%;

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
                <Toolbar></Toolbar>
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