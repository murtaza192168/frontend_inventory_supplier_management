import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

const InventoryTable = ( { refresh } ) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch inventory from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/inventory/all") 
      .then((res) => {
        setInventory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching inventory:", err);
        setLoading(false);
      });
  }, [refresh]);

  if (loading) return <CircularProgress />;

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ m: 2 }}>
        Inventory List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Purchase Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.supplierName}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{new Date(item.purchaseDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
