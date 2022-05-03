import React from 'react';
import './CreateTodoButton.css'

function CreateTodoButton(props){
    const onClick = () =>{
        props.setOpenModal(prevState => !prevState); //es el estado anterior
    };

    return(
        <section>
            <button className='CreateTodoButton' 
            onClick={onClick}>
                Agregar
            </button>
        </section>
    );
}

export {CreateTodoButton};