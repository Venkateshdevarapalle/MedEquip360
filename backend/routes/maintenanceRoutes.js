const express = require("express");
const router = express.Router();

let maintenance = [
  {
    id: 1,
    equipment: "ECG Machine",
    maintenanceDate: "2026-07-10",
    status: "Scheduled"
  }
];

// GET
router.get("/", (req, res) => {
  res.json(maintenance);
});

// CREATE
router.post("/", (req, res) => {
  const newItem = {
    id: maintenance.length + 1,
    status: "Scheduled",
    ...req.body
  };

  maintenance.push(newItem);

  res.json(newItem);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  maintenance = maintenance.filter(
    (item) => item.id !== id
  );

  res.json({
    message: "Deleted"
  });
});

module.exports = router;