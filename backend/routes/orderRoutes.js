const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================================
// Get All Orders
// ================================
router.get("/", async (req, res) => {
  try {

    const [rows] = await db.query(`
      SELECT
        o.order_id,
        h.hospital_name,
        e.equipment_name,
        o.quantity,
        o.total_amount,
        o.order_status,
        o.order_date
      FROM Orders o
      JOIN Hospitals h
        ON o.hospital_id = h.hospital_id
      JOIN Equipment e
        ON o.equipment_id = e.equipment_id
      ORDER BY o.order_date DESC
    `);

    res.json(rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

// ================================
// Get Order By ID
// ================================
router.get("/:id", async (req, res) => {

  try {

    const [rows] = await db.query(

      `
      SELECT
        o.*,
        h.hospital_name,
        e.equipment_name

      FROM Orders o

      JOIN Hospitals h
        ON o.hospital_id=h.hospital_id

      JOIN Equipment e
        ON o.equipment_id=e.equipment_id

      WHERE order_id=?
      `,

      [req.params.id]

    );

    if (rows.length === 0) {

      return res.status(404).json({
        message: "Order not found"
      });

    }

    res.json(rows[0]);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ================================
// Create Order
// ================================
router.post("/", async (req, res) => {

  const {

    hospital_id,
    equipment_id,
    quantity,
    total_amount,
    order_status,
    order_date

  } = req.body;

  try {

    const [result] = await db.query(

      `
      INSERT INTO Orders
      (
      hospital_id,
      equipment_id,
      quantity,
      total_amount,
      order_status,
      order_date
      )

      VALUES(?,?,?,?,?,?)
      `,

      [

        hospital_id,
        equipment_id,
        quantity,
        total_amount,
        order_status,
        order_date

      ]

    );

    res.status(201).json({

      message: "Order Created",
      order_id: result.insertId

    });

  } catch (err) {

    res.status(500).json({

      error: err.message

    });

  }

});

// ================================
// Update Order
// ================================
router.put("/:id", async (req, res) => {

  const {

    quantity,
    total_amount,
    order_status

  } = req.body;

  try {

    await db.query(

      `
      UPDATE Orders

      SET

      quantity=?,
      total_amount=?,
      order_status=?

      WHERE order_id=?
      `,

      [

        quantity,
        total_amount,
        order_status,
        req.params.id

      ]

    );

    res.json({

      message: "Order Updated"

    });

  } catch (err) {

    res.status(500).json({

      error: err.message

    });

  }

});

// ================================
// Delete Order
// ================================
router.delete("/:id", async (req, res) => {

  try {

    await db.query(

      "DELETE FROM Orders WHERE order_id=?",

      [req.params.id]

    );

    res.json({

      message: "Order Deleted"

    });

  } catch (err) {

    res.status(500).json({

      error: err.message

    });

  }

});

module.exports = router;
