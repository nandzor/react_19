'use client';

import { useActionState } from 'react';
import { createTodoAction } from '../actions';
import { SubmitButton } from './SubmitButton';
import { Input } from '@/components/ui/Input';
import { useEffect, useRef } from 'react';

const initialState = {
  message: null,
};

export function AddTodoForm({ onAddOptimistic }) {
  const [state, formAction] = useActionState(createTodoAction, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.message && state.message.includes('berhasil')) {
      formRef.current?.reset();
    }
  }, [state]);

  const handleFormAction = (formData) => {
    const title = formData.get('title');
    onAddOptimistic({ id: 'temp-id', title });
    formAction(formData);
  };

  return (
    <form ref={formRef} action={handleFormAction} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <Input type="text" name="title" placeholder="Apa yang ingin kamu lakukan?" required />
      <SubmitButton>Tambah</SubmitButton>
      {state?.message && <p style={{ marginLeft: '8px', alignSelf: 'center', margin: 0 }}>{state.message}</p>}
    </form>
  );
}