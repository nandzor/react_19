'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos } from '../data';
import { useOptimistic } from 'react';
import { TodoItem } from './TodoItem';
import { AddTodoForm } from './AddTodoForm';
import { Spinner } from '@/components/ui/Spinner';

export function TodoList() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    (currentTodos, optimisticValue) => {
      if (optimisticValue.type === 'add') {
        return [...currentTodos, { ...optimisticValue.todo, pending: true }];
      }
      if (optimisticValue.type === 'remove') {
        return currentTodos.filter(t => t.id !== optimisticValue.id);
      }
      return currentTodos;
    }
  );

  const handleAddOptimistic = (todo) => {
    setOptimisticTodos({ type: 'add', todo });
    // Invalidate cache to refetch after action
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  };

  const handleRemoveOptimistic = (id) => {
    setOptimisticTodos({ type: 'remove', id });
     // Invalidate cache to refetch after action
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  };

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center' }}><Spinner /></div>;
  if (isError) return <div>Error: Gagal memuat data To-Do.</div>;

  return (
    <div>
      <AddTodoForm onAddOptimistic={handleAddOptimistic} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {optimisticTodos?.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onRemoveOptimistic={handleRemoveOptimistic}
          />
        ))}
      </ul>
    </div>
  );
}