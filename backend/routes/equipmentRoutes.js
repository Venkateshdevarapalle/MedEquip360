const express = require("express");
const router = express.Router();

let equipment = [
  {
    id: 1,
    name: "ECG Machine",
    category: "Diagnostic",
    manufacturer: "Philips",
    quantity: 10
  },
  {
    id: 2,
    name: "Ventilator",
    category: "Critical Care",
    manufacturer: "GE Healthcare",
    quantity: 5
  }
];

// GET
router.get("/", (req, res) => {
  res.json(equipment);
});

// POST
router.post("/", (req, res) => {
  const newEquipment = {
    id: equipment.length + 1,
    ...req.body
  };

  equipment.push(newEquipment);

  res.json(newEquipment);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  equipment = equipment.filter(
    (item) => item.id !== id
  );

  res.json({
    message: "Equipment deleted successfully"
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  equipment = equipment.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...req.body
      };
    }

    return item;
  });

  res.json({
    message: "Equipment updated successfully"
  });
});
router.get("/stats/count", (req, res) => {
  res.json({
    totalEquipment: equipment.length
  });
});
router.get("/stats/count", (req, res) => {
  res.json({
    totalEquipment: equipment.length
  });
});

module.exports = router;