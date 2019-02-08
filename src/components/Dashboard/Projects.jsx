import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Container = styled.div`
width:80%;
border:none;
background-color:#DCEDC8;
border-radius:5px;
margin:0 auto;
box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`
const ProjTitle = styled.h1`
padding:0;
margin:0;
font-size:2em;
color:#558B2F;
text-align: center;
`
const ProjList = styled.ul`
display:flex;
flex-direction:column;
justify-content:center;
list-style:none;
padding:0;
margin:0;

& a{
    text-decoration:none;

}
`

const ProjItem = styled.li`
font-size:1.5em;
color:green;
text-decoration:none;
width:auto;
padding:3px;
margin:0;
&:hover{
    color:#F1F8E9;
    background-color:#7cb342;

}
`
const Hr = styled.hr`
display: block;
height: 1px;
border: 0;
border-top: 1px solid #558B2F;
padding: 0;

`
const Projects = (props) =>{

    return(
        <Container>
        <ProjTitle>Projects</ProjTitle>
        <ProjList>
            {props.projects.length ? (
                props.projects.map(project => (
                    <Link key={project.id} to={`/project${project.id}`}>
                        <ProjItem  >{project.title}</ProjItem>
                    </Link>
                ))
            ):(
                <ProjItem> No Projects Yet</ProjItem>
            )}
        </ProjList>
        <Hr/>
        <ProjTitle>Current</ProjTitle>
        <ProjList>
            {props.current.length
            ?
            (<Link to={`/project${props.id}`} >
                <ProjItem>{props.current}</ProjItem>
            </Link>)
            :
            (<ProjItem> No Current Project</ProjItem>)}
        </ProjList>

        </Container>
    )
}

export default Projects