import React from 'react'
import {ArticleWrap,Title,SubTitle} from './Articles'
import {DeleteBtn} from '../Toolbar/Toolbar'

const Article = (props) => {
    let date = props.article.pubDate.split(' ').splice(0,4).join(' ')
    console.log(date)

    return(
            <a href={props.article.link}>
        <ArticleWrap>
            <SubTitle>{date}</SubTitle>
                <Title>{props.article.title}</Title>
            <SubTitle>{props.article.contentSnippet}</SubTitle>
            <DeleteBtn>VIEW ARTICLE</DeleteBtn>
        </ArticleWrap>
            </a>

    )
}
export default Article