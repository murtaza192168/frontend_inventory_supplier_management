import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  MenuItem,
} from "@mui/material";

const AddInventoryForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    supplierName: "",
    weight: "",
    quantity: "",
    purchaseDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/inventory/add", formData)
      .then((res) => {
        alert("Inventory added successfully");
        onItemAdded(); // Refresh the table
        setFormData({
          productName: "",
          brand: "",
          supplierName: "",
          weight: "",
          quantity: "",
          purchaseDate: "",
        });
      })
      .catch((err) => {
        console.error("Error adding inventory:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add New Inventory Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Name"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Weight (e.g., 500ml, 1kg)"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="purchaseDate"
              label="Purchase Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.purchaseDate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Inventory
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddInventoryForm;
