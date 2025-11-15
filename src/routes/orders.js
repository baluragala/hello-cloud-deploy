const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// In-memory store for orders (in production, use a database)
const orders = [];
let orderIdCounter = 1;

/**
 * Validation rules for order creation
 */
const orderValidation = [
  body('customerId')
    .notEmpty()
    .withMessage('customerId is required')
    .isString()
    .withMessage('customerId must be a string'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('items must be a non-empty array'),
  body('items.*.productId')
    .notEmpty()
    .withMessage('productId is required for each item')
    .isString()
    .withMessage('productId must be a string'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('quantity must be a positive integer'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('price must be a non-negative number'),
  body('totalAmount')
    .isFloat({ min: 0 })
    .withMessage('totalAmount must be a non-negative number')
];

/**
 * POST /orders
 * Create a new order
 */
router.post('/', orderValidation, (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          details: errors.array()
        }
      });
    }

    const { customerId, items, totalAmount } = req.body;

    // Create order object
    const order = {
      id: `ORD-${String(orderIdCounter++).padStart(6, '0')}`,
      customerId,
      items,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
      environment: process.env.SERVICE_ENV || 'local'
    };

    // Store order (in production, save to database)
    orders.push(order);

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /orders
 * Get all orders (for testing purposes)
 */
router.get('/', (req, res) => {
  res.json({
    count: orders.length,
    orders,
    environment: process.env.SERVICE_ENV || 'local'
  });
});

module.exports = router;

