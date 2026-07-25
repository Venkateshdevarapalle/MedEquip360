const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ======================================
// Get All Warranty Records
// ======================================
router.get("/", async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
                w.warranty_id,
                e.equipment_name,
                w.warranty_provider,
                w.start_date,
                w.expiry_date,
                w.warranty_status
            FROM Warranty w
            JOIN Equipment e
            ON w.equipment_id = e.equipment_id
            ORDER BY w.expiry_date
        `);

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ======================================
// Get Warranty By ID
// ======================================
router.get("/:id", async (req, res) => {

    try {

        const [rows] = await db.query(

            `
            SELECT
                w.*,
                e.equipment_name
            FROM Warranty w
            JOIN Equipment e
            ON w.equipment_id = e.equipment_id
            WHERE warranty_id=?
            `,

            [req.params.id]

        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Warranty record not found"
            });

        }

        res.json(rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ======================================
// Add Warranty
// ======================================
router.post("/", async (req, res) => {

    const {

        equipment_id,
        warranty_provider,
        start_date,
        expiry_date,
        warranty_status

    } = req.body;

    try {

        const [result] = await db.query(

            `
            INSERT INTO Warranty
            (
                equipment_id,
                warranty_provider,
                start_date,
                expiry_date,
                warranty_status
            )

            VALUES(?,?,?,?,?)
            `,

            [

                equipment_id,
                warranty_provider,
                start_date,
                expiry_date,
                warranty_status

            ]

        );

        res.status(201).json({

            message: "Warranty added successfully",
            warranty_id: result.insertId

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});

// ======================================
// Update Warranty
// ======================================
router.put("/:id", async (req, res) => {

    const {

        warranty_provider,
        start_date,
        expiry_date,
        warranty_status

    } = req.body;

    try {

        await db.query(

            `
            UPDATE Warranty

            SET

            warranty_provider=?,
            start_date=?,
            expiry_date=?,
            warranty_status=?

            WHERE warranty_id=?
            `,

            [

                warranty_provider,
                start_date,
                expiry_date,
                warranty_status,
                req.params.id

            ]

        );

        res.json({

            message: "Warranty updated successfully"

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});

// ======================================
// Delete Warranty
// ======================================
router.delete("/:id", async (req, res) => {

    try {

        await db.query(

            "DELETE FROM Warranty WHERE warranty_id=?",

            [req.params.id]

        );

        res.json({

            message: "Warranty deleted successfully"

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});

module.exports = router;
