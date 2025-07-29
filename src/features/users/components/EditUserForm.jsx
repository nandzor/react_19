
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/features/users/actions';

const EditUserForm = ({ user, setOptimisticUsers, clearEditing }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
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
      console.log('Submitting update for user:', updatedUser);
      setOptimisticUsers({ type: 'update', user: updatedUser });
      const result = await updateUser(updatedUser, queryClient);
      console.log('Update result:', result);
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
        <label htmlFor="edit-name" className="form-label">Name</label>
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
        <label htmlFor="edit-email" className="form-label">Email</label>
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
      <div className="mb-3">
        <label htmlFor="edit-phone" className="form-label">Phone</label>
        <input
          type="tel"
          name="phone"
          id="edit-phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
          disabled={isSubmitting}
        />
      </div>
      <div className="d-flex gap-2">
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
