/**
 * Health check controller
 */
export const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Evidalis AI Backend is running',
    timestamp: new Date().toISOString(),
  });
};
