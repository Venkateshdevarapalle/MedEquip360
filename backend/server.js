require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// Database Connection
// ======================
const db = require("./config/db");

db.getConnection()
  .then((connection) => {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed");
    console.error(err.message);
  });

// ======================
// Routes
// ======================
const equipmentRoutes = require("./routes/equipmentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const warrantyRoutes = require("./routes/warrantyRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/equipment", equipmentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/warranty", warrantyRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);

// ======================
// Home Route
// ======================
app.get("/", (req, res) => {
    res.json({
        project: "MedEquip360",
        version: "1.0",
        status: "Running",
        database: "MySQL Connected"
    });
});

// ======================
// Invalid Route
// ======================
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
