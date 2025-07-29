
import React, { useState, useEffect } from 'react';
import { updateUser } from '@/features/users/actions';

const EditUserForm = ({ user, setOptimisticUsers, clearEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

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
      const updatedUser = {
        id: user.id,
        ...formData
      };
      setOptimisticUsers({ type: 'update', user: updatedUser });
      await updateUser(updatedUser);
      clearEditing();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    clearEditing();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="edit-name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          id="edit-email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-grow-1">
          {isSubmitting ? 'Updating...' : 'Update User'}
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

export default EditUserForm;
