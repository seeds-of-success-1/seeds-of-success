import React from 'react';
import {EditInput} from './Nav';
import {DeleteBtn} from '../Toolbar/Toolbar';

const Display = (props) => {
    let display = props.editting ? (
        <div style={{display: 'flex',justifyContent:'flex-end'}}>
            <EditInput style={{width:'auto'}} onChange={(e)=>props.handleInput(e)} value={props.name} />
            <DeleteBtn onClick={props.save} style={{
                height:'5px',
                fontSize:'.5rem',
                minWith:'4px',
                width:'4px'
            }} >Save</DeleteBtn>
        </div>
    ):(

            <DeleteBtn style={{
                height:'5px',
                fontSize:'.5rem',
                minWith:'4px',
                width:'4px'
            }} onClick={props.edit}>Edit</DeleteBtn>


    );
    return(
        <>
        {!props.editting ? props.children : null}
        {display}
        </>
    )
}
export default Display;