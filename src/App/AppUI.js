import React from 'react';
import {TodoCounter} from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';


function AppUI(){
    const {
        error, 
        loading, 
        searchedTodos, 
        completeTodo, 
        deleteTodo,
        openModal,
        setOpenModal,
    } = React.useContext(TodoContext)

    return(
        <React.Fragment>
            <main>
                <TodoCounter/>
                <TodoSearch/>                                   
                <TodoList>
                    {error && <p>Hubo un Error...</p>}
                    {loading && <p>Estamos Cargando...</p>}
                    {(!loading && !searchedTodos.length) && <p>Crea tu Primer ToDo!</p>}

                    {searchedTodos.map(todo =>(
                        <TodoItem 
                            key={todo.text} 
                            text={todo.text} 
                            completed={todo.completed}
                            onComplete={() => completeTodo(todo.text)}
                            onDelete = {() => deleteTodo(todo.text)}
                        />
                    ))}        
                </TodoList>      

                {!!openModal && (
                    <Modal>
                        <TodoForm/>
                    </Modal>
                )}                             
                <CreateTodoButton
                    setOpenModal={setOpenModal}                    
                />
            </main>
        </React.Fragment>
    );
}

export {AppUI};