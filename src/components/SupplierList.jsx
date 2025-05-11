import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, Typography, TableContainer, Button,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  TextField
} from '@mui/material';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [editSupplierData, setEditSupplierData] = useState({ name: '', contact: '', email: '', address: '' });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axiosInstance.get('/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const confirmDelete = (id) => {
    setSelectedSupplierId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axiosInstance.delete(`/suppliers/${selectedSupplierId}`);
      setSuppliers((prev) => prev.filter((supplier) => supplier._id !== selectedSupplierId));
    } catch (error) {
      console.error('Error deleting supplier:', error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleEditClick = (supplier) => {
    setSelectedSupplierId(supplier._id);
    setEditSupplierData({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      address: supplier.address,
    });
    setOpenEditDialog(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditSupplierData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await axiosInstance.put(`/suppliers/${selectedSupplierId}`, editSupplierData);
      setSuppliers((prev) =>
        prev.map((supplier) =>
          supplier._id === selectedSupplierId ? { ...supplier, ...editSupplierData } : supplier
        )
      );
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Supplier List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditClick(supplier)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => confirmDelete(supplier._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this supplier? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Supplier Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Supplier</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth margin="dense" label="Name" name="name"
            value={editSupplierData.name} onChange={handleEditChange}
          />
          <TextField
            fullWidth margin="dense" label="Contact" name="contact"
            value={editSupplierData.contact} onChange={handleEditChange}
          />
          <TextField
            fullWidth margin="dense" label="Email" name="email"
            value={editSupplierData.email} onChange={handleEditChange}
          />
          <TextField
            fullWidth margin="dense" label="Address" name="address"
            value={editSupplierData.address} onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SupplierList;
