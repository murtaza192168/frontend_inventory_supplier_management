import React, { useState, useEffect } from 'react';
import {
  Paper, TextField, Button, Typography, MenuItem, Grid
} from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const InventoryForm = () => {
  const { id } = useParams(); // If 'id' is present, it's an edit
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    weight: '',
    quantity: 0,
    costPrice: '',
    supplierId: ''
  });

  const [suppliers, setSuppliers] = useState([]);

  // Fetch suppliers on mount
  useEffect(() => {
    axiosInstance.get('/suppliers').then(res => {
      setSuppliers(res.data);
    }).catch(err => console.error('Error fetching suppliers:', err));
  }, []);

  // If editing, fetch existing inventory item
  useEffect(() => {
    if (id) {
      axiosInstance.get(`/inventory/${id}`).then(res => {
        const { productName, brand, weight, quantity, costPrice, supplierId } = res.data;
        setFormData({ productName, brand, weight, quantity, costPrice, supplierId });
      }).catch(err => console.error('Error fetching inventory item:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosInstance.put(`/inventory/${id}`, formData);
      } else {
        await axiosInstance.post('/inventory', formData);
      }
      navigate('/inventory');
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {id ? 'Edit Inventory Item' : 'Add Inventory Item'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Product Name" name="productName" value={formData.productName} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Brand" name="brand" value={formData.brand} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Weight" name="weight" value={formData.weight} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Quantity" type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Cost Price" type="number" name="costPrice" value={formData.costPrice} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Supplier"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              required
            >
              {suppliers.map(supplier => (
                <MenuItem key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {id ? 'Update' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default InventoryForm;
