const request = require('supertest');
const app = require('./server');

describe('FinSight API', () => {
  test('GET /api/health should return OK status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body).toEqual({
      status: 'OK',
      message: 'FinSight API is running'
    });
  });

  test('GET /api/insights should return insights array', async () => {
    const response = await request(app)
      .get('/api/insights')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});