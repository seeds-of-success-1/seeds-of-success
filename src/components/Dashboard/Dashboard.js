import React, { Component } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
background:lightgrey;
display:flex;
flex-direction:column;
height:80vh;
margin-top:10vh;
`
const Footer = styled.div`
height:10vh;
background:darkgrey;
justify-content:center;
`
class Dashboard extends Component {
    render() {
        return (
            <div>
                <DashboardContainer>
                    Lettuce begin
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    [current project]
                </DashboardContainer>
                <Footer>Currently displayed project title</Footer>
            </div>
        );
    }
}

export default Dashboard; 