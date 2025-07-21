
import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateUser } from '@/features/users/actions';

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
    <form action={formAction}>
      <div className="mb-3">
        <label htmlFor="edit-name" className="form-label">Name</label>
        <input
          type="text"
          name="name"
          id="edit-name"
          defaultValue={user.name}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edit-email" className="form-label">Email</label>
        <input
          type="email"
          name="email"
          id="edit-email"
          defaultValue={user.email}
          className="form-control"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary w-100">
      {pending ? 'Updating...' : 'Update User'}
    </button>
  );
};

export default EditUserForm;
