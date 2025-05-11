import React, { useState } from "react";
import InventoryList from "./components/InventoryList";
import InventoryForm from "./components/InventoryForm";
import SupplierForm from "./components/SupplierForm";
import SupplierList from "./components/SupplierList";
import { Container } from "@mui/material";


function App() {

  const [refresh, setRefresh] = useState(false);

  const handleItemAdded = () => {
    setRefresh((prev) => !prev); // Trigger table refresh
  };

  return(
    <Container>
      <h1>Inventory Management</h1>
      <InventoryForm onItemAdded={handleItemAdded} />
      <InventoryList refresh={refresh} />
      <SupplierForm />
      <SupplierList/>
    </Container>
  )
}

export default App
