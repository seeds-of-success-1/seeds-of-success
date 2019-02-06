import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Article from './Article';


const ArticlesWrap = styled.div`
display:flex;
flex-direction:column;
width: 30vw;
height: 70vh;
overflow-y:scroll;
margin-top:200px;
`
const CardContainer = styled.div`
height:auto;
`
export const ArticleWrap = styled.div`
display:flex;
flex-direction:column;
height:200px;
& a {
    text-decoration:none;
    color:inherit;
}
`
export const Title = styled.h3`
padding:0;
margin:0;

`
export const SubTitle = styled.p`

`


class Articles extends Component {
    render() {
        return (
           <ArticlesWrap>
               <h1>hello</h1>
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