const router = require('express').Router();
const { readFile } = require('fs');
const { promisify } = require('util');

const cmd = require('node-cmd');

const read = promisify(readFile);

async function sendSummary(req, res) {
  try {
    const summary = await read('./report/lighthouse/summary.json', 'utf8');
    return res.json({
      success: true,
      message: 'Job finished',
      path: '/reports',
      summary: JSON.parse(summary),
    });
  } catch (err) {
    return res.json({
      success: false,
      message: 'Job finished',
      path: '/reports',
      summary: [],
    });
  }
}

async function runLighthouse(req, res) {
  console.log(req.body);

  const sites = req.body.sites.join(',') || '-f sites.txt';

  console.log(`fetching... ${sites}`);
  cmd.get(`lighthouse-batch --html --sites ${sites}`, async function (
    err,
    data,
    stderr
  ) {
    console.log('Job finished', data);

    await sendSummary(req, res);
  });
}

router.route('/summary').get(sendSummary);

router.route('/lh').post(runLighthouse);

module.exports = router;
