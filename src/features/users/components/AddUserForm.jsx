
import React, { useState } from 'react';
import { createUser } from '@/features/users/actions';

const AddUserForm = ({ setOptimisticUsers, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      setOptimisticUsers({ type: 'add', user: formData });
      await createUser(formData);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-grow-1">
          {isSubmitting ? 'Adding...' : 'Add User'}
        </button>
        <button 
          type="button" 
          onClick={handleCancel} 
          disabled={isSubmitting} 
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
