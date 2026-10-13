import { ZodError } from 'zod';

/**
 * Centralized error handling middleware
 */
export const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const statusCode = err.status || err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  // Handle Zod validation errors cleanly
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors,
    });
  }

  // Generic or application errors
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};
