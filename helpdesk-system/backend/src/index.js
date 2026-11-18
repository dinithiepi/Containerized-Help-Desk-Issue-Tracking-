const express = require('express');
const cors = require('cors');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'OK' }));
app.use('/api/tickets', ticketRoutes);

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});