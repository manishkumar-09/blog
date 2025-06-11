const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // windowMs: 30 * 1000,
  limit: 100,
  message: "Too many requests. Please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
