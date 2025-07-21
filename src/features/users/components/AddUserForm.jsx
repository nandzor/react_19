
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
    <form action={formAction}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
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
      {pending ? 'Adding...' : 'Add User'}
    </button>
  );
};

export default AddUserForm;
