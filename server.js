import express from 'express';

const app = express();

app.set('trust proxy', true);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend ажиллаж байна 🚀');
});

app.get('/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  res.json({ ip });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
