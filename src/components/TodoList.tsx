import { useEffect } from "react";

export default function TodoList({list, setList} : any){
    function getData(){
        const prefix = 'todo-';
        const keys = Object.keys(localStorage);
        const matchItems : any = [];

        keys.forEach(key => {
            if (key.startsWith(prefix)) {
                let data = JSON.parse(localStorage.getItem(key) || '{}');
                matchItems.push(data);
            }
        });
        const sortedList = [...matchItems].sort((a, b) => a.id - b.id);
        setList(sortedList);
    }

    function handleDelete(id : any){
        localStorage.removeItem('todo-'+id);
        getData();
    }
    function handleCheck(e : any, id : any){
        const target = e.target;
        const data = localStorage.getItem('todo-'+id);
        let newData = JSON.parse(data || '{}');
        if(target && target.value == 'on' && !newData.check){
            newData.check = true;
        }else{
            newData.check = false;
        }
        localStorage.setItem('todo-'+id, JSON.stringify(newData));

        getData();
    }

    useEffect(() =>{
        getData();
    }, []);
    
    return <>
        <div className="todoList">
            {list.length > 0? list.map((item : any) =>(
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