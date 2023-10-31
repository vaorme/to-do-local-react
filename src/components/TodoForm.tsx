import { useState } from "react";

export default function TodoForm({handleAddTodo} : any){
    const [errorAlert, setErrorAlert] = useState(false);
    const errorClass = errorAlert? 'error' : '';

    function formHandler(e : any){
        e.preventDefault();
        const element = e.target.elements;
        const value = element['todo'].value;
        if(value == ""){
            setErrorAlert(true);
            return true;
        }
        const data = { id: (+new Date()).toString(), name: value, check: false };

        handleAddTodo(data);
        e.target.reset();
    }

    function handleInput(e : any){
        if(e.target.value != ""){
            setErrorAlert(false);
        }else{
            setErrorAlert(true);
        }
    }

    return <>
        <form action="" className="todoForm" onSubmit={formHandler}>
            <input type="text" className={errorClass} name="todo" placeholder="Agregar" onChange={handleInput}/>
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