import app from './app';

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
