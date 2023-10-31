import { useState } from "react"

export default function TodoItem({item, todos, setTodos} : any){
    const [checked, setChecked] = useState(item.check);

    function handleDelete(id : any){
        const updateTodo = todos.filter((todo : any) => todo.id != id);
        setTodos(updateTodo)
    }
    function handleCheck(e : any){
        const { name, checked } = e.target;
        const updateTodo = todos.map((todo : any) => ({
            ...todo,
            check: item.name? checked : item.check
        }));
        if(checked){
            setChecked(true);
        }else{
            setChecked(false);
        }
        setTodos(updateTodo);

    }
    return <>
        <div className="item">
            <div className="check">
                <label htmlFor={"check-"+item.id}>
                    <input type="checkbox" name="checked" id={"check-"+item.id} checked={checked} onChange={(e) => handleCheck(e, item.id)}/>
                    <div className="checkbox">  </div>
                </label>
            </div>
            <div className="name">{item.name}</div>
            <div className="actions">
                <button className='delete' onClick={() => handleDelete(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l14 0"></path>
                    </svg>
                </button>
            </div>
        </div>
    </>
}