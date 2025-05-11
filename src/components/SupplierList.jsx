import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, Typography, TableContainer, Button,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  // Fetch suppliers when the component loads
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
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axiosInstance.delete(`/suppliers/${selectedSupplierId}`);
      setSuppliers((prev) => prev.filter((supplier) => supplier._id !== selectedSupplierId)); // Remove from UI
      setOpenDialog(false);
      setSelectedSupplierId(null);
    } catch (error) {
      console.error('Error deleting supplier:', error);
      setOpenDialog(false);
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
                  {/* Delete Button */}
                  <Button variant="contained" color="error" onClick={() => confirmDelete(supplier._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this supplier? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SupplierList;
