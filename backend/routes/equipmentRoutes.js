const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all equipment
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Equipment");
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching equipment",
      error: err.message
    });
  }
});

// Get equipment by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM Equipment WHERE equipment_id=?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// Add equipment
router.post("/", async (req, res) => {

  const {
    equipment_name,
    category,
    manufacturer,
    model_number,
    serial_number,
    quantity,
    unit_price,
    supplier_id,
    purchase_date,
    status
  } = req.body;

  try {

    const [result] = await db.query(
      `INSERT INTO Equipment
      (
      equipment_name,
      category,
      manufacturer,
      model_number,
      serial_number,
      quantity,
      unit_price,
      supplier_id,
      purchase_date,
      status
      )

      VALUES(?,?,?,?,?,?,?,?,?,?)`,

      [
        equipment_name,
        category,
        manufacturer,
        model_number,
        serial_number,
        quantity,
        unit_price,
        supplier_id,
        purchase_date,
        status
      ]
    );

    res.status(201).json({
      message: "Equipment Added",
      equipment_id: result.insertId
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

// Update equipment
router.put("/:id", async (req, res) => {

  const {
    equipment_name,
    category,
    manufacturer,
    quantity,
    status
  } = req.body;

  try {

    await db.query(

      `UPDATE Equipment
       SET equipment_name=?,
           category=?,
           manufacturer=?,
           quantity=?,
           status=?
       WHERE equipment_id=?`,

      [
        equipment_name,
        category,
        manufacturer,
        quantity,
        status,
        req.params.id
      ]

    );

    res.json({
      message: "Equipment Updated"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

// Delete equipment

router.delete("/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM Equipment WHERE equipment_id=?",
      [req.params.id]
    );

    res.json({
      message: "Equipment Deleted"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;
