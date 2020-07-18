const router = require('express').Router();
const cmd = require('node-cmd');

router.get('/lh', (req, res) => {
  console.log('fetching...');
  cmd.get('lighthouse-batch -s -h -f sites.txt', function (err, data, stderr) {
    console.log('Job finished', data);
    res.json({
      success: true,
      message: 'Job finished',
      path: '/reports',
    });
  });
});

module.exports = router;
