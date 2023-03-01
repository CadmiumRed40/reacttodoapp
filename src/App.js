import React, { useState, useRef, useEffect } from 'react'; 
import TodoList from './TodoList';
import{ v4 as uuidv4 }from 'uuid' //library that helps generate unique ids

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() { 
  const [todos, setTodos] = useState([]) //useState returns an array. We destructure the object to set the initial state of todos and to update the inital state using setTodos, which causes a re-render of the component.
  const todoNameRef = useRef() //useRef allows you to reference elements in the html 

  //useEffect to store our todos in localstorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  //useEffect to get our todos from local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

function toggleTodo(id) {
  const newTodos = [...todos] //creating a copy of our array of todos. NEVER directly modify a state variable.
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

  function handleAddTodo(e){
     const name = todoNameRef.current.value
     if (name === '') return 
     setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
     })
     todoNameRef.current.value = null //clears our input when we add the todo. prevents adding multiple todos of the same text by accident.
    }

    function handleClearTodos(){
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
    }
  
  return ( //Any Javascript function can only retun one thing so the components have to be nested within a fragment 
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>{/* components are going to have props that we can give them and are assigned like an attribute in html */}
    <input ref={todoNameRef} type='text' />{/* Setting REF to the todoNameRef to grab the text being input. */}
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length}left to do</div>
    </>
  )
}



export default App;
