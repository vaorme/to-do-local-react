import TodoItem from "./TodoItem";

export default function TodoList({todos, setTodos} : any){
    return <>
        <div className="todoList">
            {todos.length > 0? todos.map((item : any) =>(
                <TodoItem item={item} key={item.id} todos={todos} setTodos={setTodos}></TodoItem>
            )) : (
                <div className="empty">¿Qué esperas para agregar uno?</div>
            )}
        </div>
    </>
}