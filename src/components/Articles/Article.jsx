import React from 'react'
import {ArticleWrap} from './Articles'
import {DeleteBtn} from '../Toolbar/Toolbar'

const Article = (props) => {
    let date = props.article.pubDate.split(' ').splice(0,4).join(' ')
    console.log(date)

    return(
        <ArticleWrap>
            <h6>{date}</h6>
            <a href={props.article.link}>
                <h3>{props.article.title}</h3>
            </a>
            <p>{props.article.contentSnippet}</p>
            <DeleteBtn/>
        </ArticleWrap>

    )
}
export default Article