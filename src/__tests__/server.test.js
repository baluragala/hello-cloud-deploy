const request = require('supertest');
const app = require('../server');

describe('Order API', () => {
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('service', 'order-api');
    });
  });

  describe('GET /', () => {
    it('should return service info', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('service', 'order-api');
      expect(response.body).toHaveProperty('status', 'running');
    });
  });

  describe('POST /orders', () => {
    it('should create a new order with valid data', async () => {
      const orderData = {
        customerId: 'CUST-001',
        items: [
          {
            productId: 'PROD-001',
            quantity: 2,
            price: 29.99
          }
        ],
        totalAmount: 59.98
      };

      const response = await request(app)
        .post('/orders')
        .send(orderData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Order created successfully');
      expect(response.body.order).toHaveProperty('id');
      expect(response.body.order).toHaveProperty('customerId', 'CUST-001');
      expect(response.body.order).toHaveProperty('status', 'pending');
    });

    it('should return 400 for invalid order data', async () => {
      const invalidOrderData = {
        customerId: '',
        items: []
      };

      const response = await request(app)
        .post('/orders')
        .send(invalidOrderData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message', 'Validation failed');
    });

    it('should return 400 when customerId is missing', async () => {
      const orderData = {
        items: [
          {
            productId: 'PROD-001',
            quantity: 1,
            price: 29.99
          }
        ],
        totalAmount: 29.99
      };

      const response = await request(app)
        .post('/orders')
        .send(orderData)
        .expect(400);

      expect(response.body.error).toHaveProperty('message', 'Validation failed');
    });

    it('should return 400 when items array is empty', async () => {
      const orderData = {
        customerId: 'CUST-001',
        items: [],
        totalAmount: 0
      };

      const response = await request(app)
        .post('/orders')
        .send(orderData)
        .expect(400);

      expect(response.body.error).toHaveProperty('message', 'Validation failed');
    });
  });

  describe('GET /orders', () => {
    it('should return all orders', async () => {
      const response = await request(app)
        .get('/orders')
        .expect(200);

      expect(response.body).toHaveProperty('count');
      expect(response.body).toHaveProperty('orders');
      expect(Array.isArray(response.body.orders)).toBe(true);
    });
  });
});

