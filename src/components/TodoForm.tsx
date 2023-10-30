import { useState } from "react";

export default function TodoForm({list, setList} : any){
    const [errorAlert, setErrorAlert] = useState(false);
    function formHandler(e : any){
        e.preventDefault();
        const element = e.target.elements;
        const todo = element['todo'].value;
        if(todo == ""){
            setErrorAlert(true);
            return true;
        }
        let nextId : any = getLastId();
        const data = { id: ++nextId, name: todo, check: false };

        setList([...list, data]);
        saveLocal(data);

        e.target.reset();
    }

    function handleInput(e : any){
        if(e.target.value != ""){
            setErrorAlert(false);
        }else{
            setErrorAlert(true);
        }
    }
    function getLastId(){
        const prefix = 'todo-';
        let keys = Object.keys(localStorage);

        keys = keys.filter(key => key.startsWith(prefix));
        keys = [...keys].sort();
        if (keys.length > 0) {
            const lastKey = keys[keys.length - 1];
            let number = lastKey.match(/\d/g);
            return number?.join("");
        }
        return 0;
    }

    function saveLocal(data : any){
        localStorage.setItem('todo-'+data.id, JSON.stringify(data))
    }

    return <>
        <form action="" className="todoForm" onSubmit={formHandler}>
            <input type="text" className={errorAlert? 'error' : ''} name="todo" placeholder="Agregar" onChange={handleInput}/>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 5l0 14"></path>
                    <path d="M5 12l14 0"></path>
                </svg>
            </button>
        </form>
        {errorAlert? (
            <div className="alert error">Debes llenar el campo para agregar un TO-DO.</div>
        ) : ''}
    </>
}