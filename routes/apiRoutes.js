const router = require('express').Router();
const { readFile } = require('fs');
const { promisify } = require('util');
const cmd = require('node-cmd');

const read = promisify(readFile);

router.get('/lh', async (req, res) => {
  console.log('fetching...');

  cmd.get('lighthouse-batch -s -h -f sites.txt', async function (
    err,
    data,
    stderr
  ) {
    console.log('Job finished', data);

    const summary = await read('./report/lighthouse/summary.json', 'utf8');

    res.json({
      success: true,
      message: 'Job finished',
      path: '/reports',
      summary,
    });
  });
});

module.exports = router;
