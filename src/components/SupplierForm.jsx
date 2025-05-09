// src/components/SupplierForm.jsx

import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

const SupplierForm = () => {
  // State to hold form data
  const [supplier, setSupplier] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to add supplier
      const response = await axiosInstance.post('/suppliers', supplier);
      console.log('Supplier added:', response.data);
      alert('Supplier added successfully!');
      // Reset form
      setSupplier({ name: '', contact: '', email: '', address: '' });
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('Failed to add supplier');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Add New Supplier
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="name"
            label="Supplier Name"
            value={supplier.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="contact"
            label="Contact Number"
            value={supplier.contact}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            value={supplier.email}
            onChange={handleChange}
          />
          <TextField
            name="address"
            label="Address"
            value={supplier.address}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            Add Supplier
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SupplierForm;
