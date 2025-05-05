import React, { useState } from "react";
import InventoryTable from "./components/InventoryTable";
import AddInventoryForm from "./components/AddInventoryForm";
import { Container } from "@mui/material";


function App() {

  const [refresh, setRefresh] = useState(false);

  const handleItemAdded = () => {
    setRefresh((prev) => !prev); // Trigger table refresh
  };

  return(
    <Container>
      <h1>Inventory Management</h1>
      <AddInventoryForm onItemAdded={handleItemAdded} />
      <InventoryTable refresh={refresh} />
    </Container>
  )
}

export default App
