import { useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LogoSvg from './assets/logo-to-do.svg'
import './App.css'

function App() {
    const [list, setList] = useState([]);
    return (
		<>
			<div id="todo">
				<div className="contain">
					<div className="logo">
						<img src={LogoSvg} alt="To-Do" />
					</div>
					<TodoForm list={list} setList={setList}/>
					<TodoList list={list} setList={setList}></TodoList>
				</div>
			</div>
		</>
    )
}

export default App