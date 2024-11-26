const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware to serve static files
app.use('/uploads', express.static('uploads'));

// Upload file
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

// View files
app.get('/files', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(files);
  });
});

// Delete file
app.delete('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'File deleted successfully' });
  });
});

// Edit file (for simplicity, we will just rename the file)
app.put('/files/:oldFilename', (req, res) => {
  const oldPath = path.join(__dirname, 'uploads', req.params.oldFilename);
  const newPath = path.join(__dirname, 'uploads', req.body.newFilename);
  
  fs.rename(oldPath, newPath, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'File renamed successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
