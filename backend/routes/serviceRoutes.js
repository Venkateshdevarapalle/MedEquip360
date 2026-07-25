const express = require("express");
const router = express.Router();
const db = require("../config/db");

// =====================================
// Get All Services
// =====================================
router.get("/", async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
                maintenance_id AS service_id,
                equipment_id,
                service_type,
                engineer_name,
                service_date,
                next_service_date,
                status,
                remarks
            FROM Maintenance
            ORDER BY service_date DESC
        `);

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// =====================================
// Get Service By ID
// =====================================
router.get("/:id", async (req, res) => {

    try {

        const [rows] = await db.query(

            `
            SELECT *

            FROM Maintenance

            WHERE maintenance_id=?
            `,

            [req.params.id]

        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Service not found"
            });

        }

        res.json(rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// =====================================
// Add Service
// =====================================
router.post("/", async (req, res) => {

    const {

        equipment_id,
        service_type,
        engineer_name,
        service_date,
        next_service_date,
        status,
        remarks

    } = req.body;

    try {

        const [result] = await db.query(

            `
            INSERT INTO Maintenance
            (
                equipment_id,
                service_type,
                engineer_name,
                service_date,
                next_service_date,
                status,
                remarks
            )

            VALUES(?,?,?,?,?,?,?)
            `,

            [

                equipment_id,
                service_type,
                engineer_name,
                service_date,
                next_service_date,
                status,
                remarks

            ]

        );

        res.status(201).json({

            message: "Service record created",
            service_id: result.insertId

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});

// =====================================
// Update Service
// =====================================
router.put("/:id", async (req, res) => {

    const {

        service_type,
        engineer_name,
        service_date,
        next_service_date,
        status,
        remarks

    } = req.body;

    try {

        await db.query(

            `
            UPDATE Maintenance

            SET

            service_type=?,
            engineer_name=?,
            service_date=?,
            next_service_date=?,
            status=?,
            remarks=?

            WHERE maintenance_id=?
            `,

            [

                service_type,
                engineer_name,
                service_date,
                next_service_date,
                status,
                remarks,
                req.params.id

            ]

        );

        res.json({

            message: "Service updated successfully"

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});

// =====================================
// Delete Service
// =====================================
router.delete("/:id", async (req, res) => {

    try {

        await db.query(

            "DELETE FROM Maintenance WHERE maintenance_id=?",

            [req.params.id]

        );

        res.json({

            message: "Service deleted successfully"

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});

module.exports = router;
