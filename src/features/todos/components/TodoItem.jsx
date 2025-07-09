'use client';

import { useActionState } from 'react';
import { deleteTodoAction } from '../actions';
import { SubmitButton } from './SubmitButton';

const initialState = { message: null };

export function TodoItem({ todo, onRemoveOptimistic }) {
  const [state, formAction] = useActionState(deleteTodoAction, initialState);

  const handleDelete = (formData) => {
    onRemoveOptimistic(todo.id);
    formAction(formData);
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
    opacity: todo.pending ? 0.5 : 1,
  };

  const titleStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
  };

  return (
    <li style={itemStyle}>
      <span style={titleStyle}>{todo.title} {todo.pending && '(Menyimpan...)'}</span>
      <form action={handleDelete}>
        <input type="hidden" name="id" value={todo.id} />
        <SubmitButton style={{ backgroundColor: '#dc3545' }}>Hapus</SubmitButton>
      </form>
    </li>
  );
}