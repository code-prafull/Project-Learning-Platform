const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.post('/register', upload.single('profile'), (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  const profile = req.file;

  console.log('Form Data:', req.body);
  console.log('Uploaded File:', profile);

  if (password !== confirm_password) {
    return res.send('Passwords do not match.');
  }

  res.send('Registration Successful!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
