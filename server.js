const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const serveIndex = require('serve-index');
const timeout = require('./middleware/timeout');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/reports',
  express.static('report/lighthouse'),
  serveIndex('report/lighthouse', { icons: true })
);
// app.use(timeout);
app.use('/api', apiRoutes);
app.use(express.static('public'));
app.use('/', htmlRoutes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
