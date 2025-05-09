import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, Typography, TableContainer
} from '@mui/material';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SupplierList;
