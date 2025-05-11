import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, Typography, TableContainer, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axiosInstance.get('/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/inventory/${deleteId}`);
      setInventory(prev => prev.filter(item => item._id !== deleteId));
      setOpenConfirm(false);
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Inventory List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost Price</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map(item => (
              <TableRow key={item._id}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.weight}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.costPrice}</TableCell>
                <TableCell>{item.supplierId?.name || 'N/A'}</TableCell>
                <TableCell>{new Date(item.purchaseDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => confirmDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this inventory item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default InventoryList;
