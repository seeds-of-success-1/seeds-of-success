import React from 'react';
import {Redirect} from 'react-router-dom'
export const getuser = (name) => {
    setTimeout(()=>{
       alert(`Hello ${name}, I haven't seen you in awhile.`)
        setTimeout(() => {
          return  window.location.replace("https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/thCA45AUMV.jpg?itok=atmSvLbi")
        }, 3 * 5000);
   },10*1000)
}
