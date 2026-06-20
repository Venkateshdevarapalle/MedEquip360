const express = require("express");
const router = express.Router();

let warranties = [
  {
    id: 1,
    equipment: "ECG Machine",
    expiryDate: "2028-01-01",
    status: "Active"
  }
];

// GET
router.get("/", (req, res) => {
  res.json(warranties);
});

// CREATE
router.post("/", (req, res) => {
  const newWarranty = {
    id: warranties.length + 1,
    ...req.body
  };

  warranties.push(newWarranty);

  res.json(newWarranty);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  warranties = warranties.filter(
    (item) => item.id !== id
  );

  res.json({
    message: "Warranty deleted"
  });
});

module.exports = router;