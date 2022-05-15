import React, { useState } from 'react';
import Todo from './Todo';
import TodoNewForm from './TodoNewForm';

function TodoList() {
  const [ todos, setTodos ] = useState([]);

  const create = newTodo => {
    setTodos(todos => [...todos, newTodo]);
  };

  const update = (id, updateTask) => {
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, task: updateTask } : todo));
  };

  const remove = id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const todoProps = todos.map(todo => (
    <Todo
      remove={remove}
      key={todo.id}
      id={todo.id}
      task={todo.task}
      update={update}
    />
  ));

  return (
    <div>
      <TodoNewForm createTodo={create} />
      <ul>{todoProps}</ul>
    </div>
  );
}

export default TodoList;