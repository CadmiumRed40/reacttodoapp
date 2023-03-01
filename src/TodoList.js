// Using the ES7 react snippets plugin, type 'rfc' to generate component boilerplate using the filename.
import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos , toggleTodo }) {
  return (
    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={ todo } /> //setting a key must have a unique name and will let REACT know to update the specific element.
    })
  )
}
