'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/Button';

export function SubmitButton({ children, style }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} style={style}>
      {pending ? 'Menyimpan...' : children}
    </Button>
  );
}