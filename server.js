const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const serveIndex = require('serve-index');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/reports',
  express.static('report/lighthouse'),
  serveIndex('report/lighthouse', { icons: true })
);
app.use('/api', apiRoutes);
app.use(express.static('public'));
app.use('/', htmlRoutes);

// All other routes respond with the index.html file

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
