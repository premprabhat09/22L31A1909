const { accessToken } = require('./config.js');

/**
 * Sends a log message to the evaluation service.
 * @param {string} stack - The stack trace.
 * @param {string} level - The log level.
 * @param {string} pkg - The package name.
 * @param {string} message - The log message.
 */
async function Log(stack, level, pkg, message) {
  try {
    const response = await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });

    const responseData = await response.json();
    console.log('Log response:', responseData);
  } catch (error) {
    console.error('Error logging to evaluation service:', error);
  }
}

module.exports = { Log };