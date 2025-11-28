/**
 * Ticket Controller
 * Handles ticket creation, listing, verification, and QR generation
 */

const Ticket = require('../models/Ticket');
const { generateQRCode, createSignedPayload, verifySignature } = require('../utils/qrService');
const crypto = require('crypto');

/**
 * Generate unique ticket ID
 */
const generateTicketId = () => {
  return `TK${Date.now()}${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
};

/**
 * Create a new ticket and generate QR code
 * POST /api/tickets/create
 */
exports.createTicket = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Check if ticket already exists for this email (optional - can allow multiple)
    // For now, we'll allow multiple tickets per email

    // Generate ticket ID
    const ticketId = generateTicketId();
    const createdAt = new Date();

    // Create signed payload
    const payload = createSignedPayload(ticketId, email.toLowerCase(), createdAt);

    // Generate QR code
    const qrDataURL = await generateQRCode(payload);

    // Save ticket to database
    const ticket = new Ticket({
      ticketId,
      email: email.toLowerCase(),
      name,
      used: false,
      createdAt
    });
    await ticket.save();

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      ticket: {
        ticketId: ticket.ticketId,
        email: ticket.email,
        name: ticket.name,
        createdAt: ticket.createdAt,
        used: ticket.used
      },
      qrCode: qrDataURL,
      payload: payload // For debugging/testing
    });

  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create ticket'
    });
  }
};

/**
 * List all tickets
 * GET /api/tickets/list
 */
exports.listTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets
    });

  } catch (error) {
    console.error('List tickets error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch tickets'
    });
  }
};

/**
 * Verify QR code payload
 * POST /api/tickets/verify
 */
exports.verifyTicket = async (req, res) => {
  try {
    const { ticketId, email, createdAt, signature } = req.body;

    // Validation
    if (!ticketId || !email || !createdAt || !signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid QR code payload. Missing required fields.'
      });
    }

    // Create payload object (without signature for verification)
    const payload = {
      ticketId,
      email: email.toLowerCase(),
      createdAt
    };

    // Verify signature
    const isValidSignature = verifySignature(payload, signature);
    if (!isValidSignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid QR code signature. Ticket may be tampered with.'
      });
    }

    // Find ticket in database
    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    // Check if email matches
    if (ticket.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: 'Email mismatch. This ticket belongs to a different user.'
      });
    }

    // Check if already used
    if (ticket.used) {
      return res.status(400).json({
        success: false,
        message: 'Ticket has already been used',
        usedAt: ticket.usedAt
      });
    }

    // Ticket is valid!
    res.status(200).json({
      success: true,
      message: 'Ticket verified successfully',
      ticket: {
        ticketId: ticket.ticketId,
        email: ticket.email,
        name: ticket.name,
        createdAt: ticket.createdAt,
        used: ticket.used
      }
    });

  } catch (error) {
    console.error('Verify ticket error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify ticket'
    });
  }
};

/**
 * Mark ticket as used
 * POST /api/tickets/mark-used
 */
exports.markTicketUsed = async (req, res) => {
  try {
    const { ticketId } = req.body;

    if (!ticketId) {
      return res.status(400).json({
        success: false,
        message: 'Ticket ID is required'
      });
    }

    // Find and update ticket
    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    if (ticket.used) {
      return res.status(400).json({
        success: false,
        message: 'Ticket is already marked as used'
      });
    }

    ticket.used = true;
    ticket.usedAt = new Date();
    await ticket.save();

    res.status(200).json({
      success: true,
      message: 'Ticket marked as used successfully',
      ticket: {
        ticketId: ticket.ticketId,
        email: ticket.email,
        name: ticket.name,
        used: ticket.used,
        usedAt: ticket.usedAt
      }
    });

  } catch (error) {
    console.error('Mark ticket used error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to mark ticket as used'
    });
  }
};

