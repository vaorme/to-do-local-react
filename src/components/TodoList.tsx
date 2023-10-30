import { useEffect } from "react";

export default function TodoList({list, setList}){
    function getData(){
        const prefix = 'todo-';
        const keys = Object.keys(localStorage);
        const matchItems = [];

        keys.forEach(key => {
            if (key.startsWith(prefix)) {
                let data = JSON.parse(localStorage.getItem(key));
                matchItems.push(data);
            }
        });
        const sortedList = [...matchItems].sort((a, b) => a.id - b.id);
        setList(sortedList);
    }

    function handleDelete(id){
        localStorage.removeItem('todo-'+id);
        getData();
    }
    function handleCheck(e, id){
        const target = e.target;
        let data = localStorage.getItem('todo-'+id);
        data = JSON.parse(data);
        if(target && target.value == 'on' && !data.check){
            data.check = true;
        }else{
            data.check = false;
        }
        localStorage.setItem('todo-'+id, JSON.stringify(data));

        getData();
    }

    useEffect(() =>{
        getData();
    }, []);
    
    return <>
        <div className="todoList">
            {list.length > 0? list.map(item =>(
                <div className="item" key={item.id}>
                    <div className="check">
                        <label htmlFor={"check-"+item.id}>
                            <input type="checkbox" name="checked" id={"check-"+item.id} checked={item.check} onChange={(e) => handleCheck(e, item.id)}/>
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
            )) : (
                <div className="empty">¿Qué esperas para agregar uno?</div>
            )}
        </div>
    </>
}