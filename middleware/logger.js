module.exports = (req, res, next) => {
    const log = {
      method: req.method,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      body: req.body,
      ip: req.ip,
    };
  
    // Log to a file or DB (no console.log or default loggers)
    // Example: write to a log file
    require('fs').appendFileSync('logs.txt', JSON.stringify(log) + '\n');
  
    next();
  };