import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Article from './Article';


const ArticlesWrap = styled.div`
width:350px;
min-width:350px;
max-width:350px;
height: 71vh;
overflow-y:hidden;
margin-top:200px;
padding:20px;
position:relative;
bottom:100px;
overflow-x:hidden;
transform:translateY(0px);
`
const CardContainer = styled.div`
height:100%;
width:98%;
display:flex;
flex-direction:column;
margin-top:50px;
padding:0 5px;
overflow-y:auto;
overflow-x:hidden;

position:relative;
& a {
    text-decoration:none;
    color:inherit;
};
`
export const ArticleWrap = styled.div`
display:flex;
flex-direction:column;
width:95%;
height:auto;
padding:10px;
margin:10px 0;
position:relative;
right:1px;
border:none;
border-radius:5px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
&:hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
`
const MainTitleWrap = styled.div`
background:#558B2F;
width:85%;
color:#fff;
padding:10px;
position:fixed;
z-index:100;
border-top-left-radius:5px;
border-top-right-radius:5px;
`

const MainTitle = styled.h1`
width:100%;
padding:0;
margin:0;
text-align:center;
`
export const Title = styled.h3`
padding:0;
margin:0;

`
export const SubTitle = styled.p`
&:nth-child(1){
    position:relative;
    left:62%;
    bottom:10px;
    color:#70818a;
}
`


class Articles extends Component {
    render() {
        return (
           <ArticlesWrap>
               <MainTitleWrap>
                <MainTitle>Gardening News</MainTitle>
               </MainTitleWrap>

               <CardContainer>
               {this.props.state.articles.map(article => (
                   <Article key={article.id} article={article} />
                ))}
               </CardContainer>
           </ArticlesWrap>

        );
    }
}
function mapStateToProps(state){
    return{state}
}

export default connect(mapStateToProps)(Articles);