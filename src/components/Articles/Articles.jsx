import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Article from './Article';
import {CloseBtn} from '../Toolbar/Toolbar';
import close from '../Toolbar/close-btn.1.svg';

const ArticlesWrap = styled.div`
width:350px;
min-width:350px;
max-width:350px;
height: 74vh;
overflow-y:hidden;
padding:0 10px;
position:absolute;
top:180px;
left:${props => props.show ? "0" : "-400px"};
transition:all 1s ease-in-out;
bottom:100px;
overflow-x:hidden;
z-index:100;
transform:translateY(0px);
@media(max-width:500px){
position:fixed;
}
`
const CardContainer = styled.div`
height:64vh;
width:97%;
display:flex;
flex-direction:column;
background:#F1F8E9;
margin-top:60px;
padding:0 10px;
overflow-y:auto;
overflow-x:hidden;
position:relative;
/* padding-bottom:420px; */
& a {
    text-decoration:none;
    color:inherit;
};
`
export const ArticleWrap = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:auto;
padding:10px;
margin:10px 0;
position:relative;
background:#fff;
right:10px;
border:none;
border-radius:5px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
&:hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
`
const MainTitleWrap = styled.div`
background:#558B2F;
width:92%;
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
    color:#8BC34A;
}
`
const Close = styled(CloseBtn)`
position:absolute;
top:4px;
right:4px;
color:#fff;
`


class Articles extends Component {
    render() {
        let articles = this.props.articlesLoading
        ? <div style={{marginTop:'100px'}} >Loading</div>
        :  <>

            <MainTitleWrap>
            <Close onClick={this.props.close} src={close} ></Close>
            <MainTitle>Gardening News</MainTitle>
            </MainTitleWrap>

            <CardContainer>

            {this.props.state.articles.map(article => (
                <Article key={article.guid} article={article} />
            ))}
            </CardContainer>
            </>
        return (
             <ArticlesWrap show={this.props.show} >
                {articles}

               </ArticlesWrap>
        );
    }
}

function mapStateToProps(state){
    return{state}
}

export default connect(mapStateToProps)(Articles);