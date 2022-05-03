import React from 'react';
import './TodoItem.css';

function TodoItem(props){

    //props.onComplete y props.onDelete es la funcion que estamos pasando por App.js
    return(        
        <li className='TodoItem'>   
            <span className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
            onClick={props.onComplete}> 
                √
            </span>         
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.text}</p> 
            <span className="Icon Icon-delete"
            onClick={props.onDelete}>
                X
            </span>           
        </li>
             
    );
}

export {TodoItem};