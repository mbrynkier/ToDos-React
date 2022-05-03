import React from 'react';

function useLocalStorage(itemName, initialValue){ //esto es un ReactHook para poder guardar en local Storage
//Recibe el nombre de donde vamos a guardar en local storage y el valor inicial
    const [loading, setLoading]  = React.useState(true); //Estamos simulando que estamos llamando a una API, se lo ponemos en true al principio
    const [error, setError]  = React.useState(false);

    const [item, setItem] = React.useState(initialValue); //esto se usa para los estados

    React.useEffect(() =>{
        setTimeout(() => { //imitamos que tarde en cargar
            try{ //agregamos el trycatch para simular si pasa un error
            const localStorageItem = localStorage.getItem(itemName); //creamos un local storage
            let parsedItem;

            if (!localStorageItem) {
                localStorage.setItem(itemName, JSON.stringify(initialValue)) //Si no existe lo asignamos y creamos un array vacio
                parsedItem = initialValue;
            }else{
                parsedItem = JSON.parse(localStorageItem); //Si ya existe guarda el array que tenia en el local storage
            }

            setItem(parsedItem);
            setLoading(false); //una vez que carga todo le ponemos que ya no esta haciendo loading
            }catch(error){
            setError(true);
            }
        }, 1000)
    });

    
    const saveItem = (newItem) =>{ //Creamos esta funcion para que guarde en el local storage y en el array.
    try {
        const stringifyItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifyItem);
        setItem(newItem);  
    } catch (error) {
        setError(error)
    }
    
    };

    //Esto es lo que le esta devolviendo
    return {
        item,
        saveItem,
        loading,
        error,
    };
}

export {useLocalStorage};