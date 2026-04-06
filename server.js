import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend ажиллаж байна 🚀');
});

app.get('/ip', (req, res) => {
  res.json({ ip: req.ip });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
