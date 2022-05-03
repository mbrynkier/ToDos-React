import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props){
    const{
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1', []); //Se puede tambien usar objetos, los : es para cambiarle el nombre

    const [searchValue, setSearchValue] = React.useState(''); //el primero es el nombre de la variable y el segundo se lo cambia
    const [openModal, setOpenModal] = React.useState(false) //Este context es para usar con el modal

    const completedTodos = todos.filter(todo => !!todo.completed).length;
    const totalTodos = todos.length;

    let searchedTodos = [];

    if(!searchValue.length >= 1){
    searchedTodos = todos;
    }else{
        searchedTodos = todos.filter(todo =>{
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        })    
    }  

    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos]; //Aca le estamos pasando todos los todos en un nuevo array
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos]; //Aca le estamos pasando todos los todos en un nuevo array
        newTodos.splice(todoIndex,1);
        saveTodos(newTodos);
    };

    const addTodo = (text) => {
        const newTodos = [...todos]; //Aca le estamos pasando todos los todos en un nuevo array
        newTodos.push({
            completed: false,
            text,
        })
        saveTodos(newTodos);
    };


    return(
        <TodoContext.Provider value={{
            error,
            loading,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,  
            addTodo,          
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export {TodoContext, TodoProvider};