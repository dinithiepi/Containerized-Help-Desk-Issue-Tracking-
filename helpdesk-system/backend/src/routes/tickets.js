const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tickets ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a ticket
router.post('/', async (req, res) => {
    const { title, description, priority, submitted_by, category } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO tickets (title, description, priority, submitted_by, category)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, description, priority, submitted_by, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update ticket status
router.patch('/:id', async (req, res) => {
    const { status, priority } = req.body;
    try {
        const result = await pool.query(
            `UPDATE tickets SET
        status = COALESCE($1, status),
        priority = COALESCE($2, priority),
        updated_at = NOW()
       WHERE id = $3 RETURNING *`,
            [status || null, priority || null, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a ticket
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM tickets WHERE id = $1', [req.params.id]);
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;