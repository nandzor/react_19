
import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createUser } from '../actions';

const AddUserForm = ({ setOptimisticUsers, onSuccess }) => {
  const [state, formAction] = useActionState(async (previousState, formData) => {
    const newUser = {
      name: formData.get('name'),
      email: formData.get('email'),
    };
    setOptimisticUsers({ type: 'add', user: newUser });
    const result = await createUser(newUser);
    if (onSuccess) onSuccess();
    return result;
  }, null);

  return (
    <form action={formAction} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full p-2 border rounded-lg"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border rounded-lg"
      />
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full p-2 text-white bg-blue-500 rounded-lg">
      {pending ? 'Adding...' : 'Add User'}
    </button>
  );
};

export default AddUserForm;
