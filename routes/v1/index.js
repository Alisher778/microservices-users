const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

module.exports = router;
