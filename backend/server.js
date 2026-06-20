const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const equipmentRoutes = require("./routes/equipmentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const orderRoutes = require("./routes/orderRoutes");
const warrantyRoutes = require("./routes/warrantyRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
app.use("/api/equipment", equipmentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/warranty", warrantyRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.get("/", (req, res) => {
  res.send("MedEquip360 Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});