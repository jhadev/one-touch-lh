const router = require('express').Router();
const { readFile, readdir } = require('fs');
const { promisify } = require('util');

const cmd = require('node-cmd');

const read = promisify(readFile);
const readDir = promisify(readdir);

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

router.route('/json-reports').get(async (req, res) => {
  const reportDir = await readDir('./report/lighthouse/');
  console.log(reportDir);

  const files = reportDir.filter((file) => {
    if (file !== 'summary.json' && file.endsWith('.json')) {
      return file;
    }
  });

  console.log(files);

  const jsonReports = Promise.all(
    files.map(async (file) => {
      return await read(`./report/lighthouse/${file}`, 'utf8');
    })
  );

  const data = await jsonReports;

  res.json(data);
});

router.route('/lh').post(runLighthouse);

module.exports = router;
