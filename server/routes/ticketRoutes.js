/**
 * Ticket Routes
 * /api/tickets
 */

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createTicket, listTickets, verifyTicket, markTicketUsed } = require('../controllers/ticketController');

// All ticket routes require authentication
router.use(authMiddleware);

// POST /api/tickets/create - Create ticket and generate QR
router.post('/create', createTicket);

// GET /api/tickets/list - List all tickets
router.get('/list', listTickets);

// POST /api/tickets/verify - Verify QR code payload
router.post('/verify', verifyTicket);

// POST /api/tickets/mark-used - Mark ticket as used
router.post('/mark-used', markTicketUsed);

module.exports = router;

