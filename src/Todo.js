import React from 'react'

export default function Todo({ todo, toggleTodo}) { //passing in a todo element into our component to make the component render one todo item
  function handleTodoClick(){
    toggleTodo(todo.id)
  }
  
    return (
    <div>
        <label>
            <input type='checkbox' checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
        </label>
    </div>
  )
}
