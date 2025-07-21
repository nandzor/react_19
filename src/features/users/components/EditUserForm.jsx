
import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateUser } from '../actions';

const EditUserForm = ({ user, setOptimisticUsers, clearEditing }) => {
  const [state, formAction] = useActionState(async (previousState, formData) => {
    const updatedUser = {
      id: user.id,
      name: formData.get('name'),
      email: formData.get('email'),
    };
    setOptimisticUsers({ type: 'update', user: updatedUser });
    const result = await updateUser(updatedUser);
    clearEditing();
    return result;
  }, null);

  return (
    <form action={formAction} className="space-y-4">
      <input
        type="text"
        name="name"
        defaultValue={user.name}
        className="w-full p-2 border rounded-lg"
      />
      <input
        type="email"
        name="email"
        defaultValue={user.email}
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
      {pending ? 'Updating...' : 'Update User'}
    </button>
  );
};

export default EditUserForm;
