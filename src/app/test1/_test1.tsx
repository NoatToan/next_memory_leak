'use client';

import { fetchAddTodo, Todo } from '@/modules/api';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function Test1(props: { mockPromises: Todo[] }) {
  console.log('props.mockPromises', props.mockPromises.length);

  const addTodo = async (todo: Todo) => {
    await fetchAddTodo(todo);
  };

  const updateTodo = async (updatedTodo: Todo) => {
    await fetchAddTodo(updatedTodo);
  };

  return (
    <div className={inter.className}>
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div className='todo-list'>
        {props.mockPromises.map((todo) => (
          <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} />
        ))}
      </div>
    </div>
  );
}
export const TodoItem: React.FC<{
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}> = ({ todo, updateTodo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({ ...todo, text: e.target.value });
  };

  return (
    <div className='todo-item'>
      <input type='text' value={todo.text} onChange={handleChange} />
    </div>
  );
};

export const TodoForm: React.FC<{ addTodo: (todo: Todo) => void }> = ({
  addTodo,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({ id: Date.now(), text: text.trim() });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Add a new todo'
        defaultValue={'Test'}
      />
      <button type='submit'>Add</button>
    </form>
  );
};
