import { ApiResponse } from '../utils/api-response.js';
const healthCheck = (req, res) => {
  try {
    res.status(200).json(new ApiResponse(200, 'Server is healthy'));
    console.log('Health check successful');
  } catch (err) {
    console.error('Health check failed:', err.message);
  }
};

export { healthCheck };
