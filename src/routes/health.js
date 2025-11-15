const express = require('express');
const router = express.Router();

/**
 * Health check endpoint
 * Returns service health status
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.SERVICE_ENV || 'local',
    service: 'order-api'
  });
});

module.exports = router;

