const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ==========================
// Get All Maintenance Records
// ==========================
router.get("/", async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
                m.maintenance_id,
                e.equipment_name,
                m.service_type,
                m.service_date,
                m.next_service_date,
                m.engineer_name,
                m.remarks,
                m.status
            FROM Maintenance m
            JOIN Equipment e
            ON m.equipment_id = e.equipment_id
            ORDER BY m.service_date DESC
        `);

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ==========================
// Get Maintenance By ID
// ==========================
router.get("/:id", async (req, res) => {

    try {

        const [rows] = await db.query(
            `
            SELECT
                m.*,
                e.equipment_name
            FROM Maintenance m
            JOIN Equipment e
            ON m.equipment_id=e.equipment_id
            WHERE maintenance_id=?
            `,
            [req.params.id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Maintenance record not found"
            });

        }

        res.json(rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ==========================
// Add Maintenance Record
// ==========================
router.post("/", async (req, res) => {

    const {

        equipment_id,
        service_type,
        service_date,
        next_service_date,
        engineer_name,
        remarks,
        status

    } = req.body;

    try {

        const [result] = await db.query(
            `
            INSERT INTO Maintenance
            (
                equipment_id,
                service_type,
                service_date,
                next_service_date,
                engineer_name,
                remarks,
                status
            )

            VALUES(?,?,?,?,?,?,?)
            `,
            [
                equipment_id,
                service_type,
                service_date,
                next_service_date,
                engineer_name,
                remarks,
                status
            ]
        );

        res.status(201).json({
            message: "Maintenance record added",
            maintenance_id: result.insertId
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ==========================
// Update Maintenance
// ==========================
router.put("/:id", async (req, res) => {

    const {

        service_type,
        service_date,
        next_service_date,
        engineer_name,
        remarks,
        status

    } = req.body;

    try {

        await db.query(
            `
            UPDATE Maintenance

            SET

            service_type=?,
            service_date=?,
            next_service_date=?,
            engineer_name=?,
            remarks=?,
            status=?

            WHERE maintenance_id=?
            `,
            [

                service_type,
                service_date,
                next_service_date,
                engineer_name,
                remarks,
                status,
                req.params.id

            ]
        );

        res.json({
            message: "Maintenance updated successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// ==========================
// Delete Maintenance
// ==========================
router.delete("/:id", async (req, res) => {

    try {

        await db.query(
            "DELETE FROM Maintenance WHERE maintenance_id=?",
            [req.params.id]
        );

        res.json({
            message: "Maintenance deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;
