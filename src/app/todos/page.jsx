'use client';

import { Header } from '@/components/layout/Header';
import { TodoList } from '@/features/todos/components/TodoList';

const pageContainerStyle = {
  maxWidth: '768px',
  margin: '0 auto',
  padding: '0 16px',
  fontFamily: 'sans-serif',
}

export default function TodoPage() {
  return (
    <main style={pageContainerStyle}>
      <Header />
      <TodoList />
    </main>
  );
}