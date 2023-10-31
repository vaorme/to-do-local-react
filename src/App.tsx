import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LogoSvg from './assets/logo-to-do.svg'
import './App.css'

function App() {
	const [todos, setTodos] = useState(() => {
		const data = localStorage.getItem('todos');
		return data? JSON.parse(data) : [];
	});

	useEffect(() => {
        if (todos && todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        } else {
            localStorage.removeItem('todos');
        }
    }, [todos]);

	const handleAddTodo = (newTodo : never) =>{
		setTodos([...todos, newTodo]);
	}
    return (
		<>
			<div id="todo">
				<div className="contain">
					<div className="logo">
						<img src={LogoSvg} alt="To-Do" />
					</div>
					<TodoForm handleAddTodo={handleAddTodo} />
					<TodoList todos={todos} setTodos={setTodos} />
				</div>
			</div>
		</>
    )
}

export default App