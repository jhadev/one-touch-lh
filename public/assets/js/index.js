const run = document.getElementById('run');
const section = document.querySelector('#data');
section.setAttribute('class', 'data-results');
const siteSection = document.querySelector('#site-selection');
const main = document.querySelector('main');

const legend = document.querySelector('legend');

function createList(arr) {
  arr.forEach((site) => {
    const div = document.createElement('div');
    div.innerHTML = site.createHTML();
    legend.after(div);
  });
}

createList(siteList);

async function checkForSummary() {
  const response = await fetch('/api/summary');
  await makeRequest(response);
}

function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
}

function waiting() {
  const columns = document.querySelectorAll('.data-results');
  columns.forEach((column) => {
    column.innerHTML = '';
  });
  run.disabled = true;
  const h1 = document.createElement('h1');
  h1.textContent = 'waiting... be patient';
  h1.classList.add('msg');

  section.appendChild(h1);
}

async function makeRequest(response) {
  const results = await response.json();
  const { path, summary, message } = results;
  if (document.querySelector('.msg')) {
    document.querySelector('.msg').textContent = '';
  }

  const article = document.createElement('article');
  article.setAttribute('id', 'results');

  const pre = document.createElement('pre');
  const a = document.createElement('a');
  pre.textContent = `${JSON.stringify(results, null, 2)}`;
  a.href = path;
  a.textContent = 'Results here';

  section.appendChild(article);
  article.appendChild(a);
  article.appendChild(pre);

  const resultsSection = document.createElement('section');
  resultsSection.setAttribute('class', 'data-results');
  main.appendChild(resultsSection);

  summary.forEach((test) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'score-info');
    const link = document.createElement('a');
    const scoreLink = document.createElement('a');
    link.textContent = `${test.url}`;
    link.href = `${test.url}`;
    link.target = '_blank';

    scoreLink.textContent = `View HTML Report`;
    scoreLink.href = `${path}/${test.html}`;
    const score = document.createElement('p');
    score.textContent = `Performance Score: ${
      test.detail ? test.detail.performance * 100 : 'no data'
    }`;
    resultsSection.appendChild(div);
    div.appendChild(link);
    div.appendChild(score);
    div.appendChild(scoreLink);
  });
  run.disabled = false;
}

const waitFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function timer(timeleft) {
  setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(timer);
      location.reload();
    }
    document.querySelector(
      '.msg'
    ).innerHTML = `Response timeout, wait for page to reload in ${timeleft} seconds to see results`;

    timeleft -= 1;
  }, 1000);
}

async function onSubmit(e) {
  e.preventDefault();

  const sites = document.querySelectorAll('input[type="checkbox"]');

  const checkedSites = [...sites]
    .filter((site) => {
      if (site.checked) {
        return site;
      }
    })
    .map((site) => site.value);

  let body = {
    sites: checkedSites,
  };

  let timeLeft = checkedSites.length * 60;

  waiting();
  try {
    const response = await timeout(
      1000000,
      fetch('/api/lh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    );
    console.log(response);
    if (response.status === 200) {
      await makeRequest(response);
    }

    // await waitFor(120000);
    // location.reload();
  } catch (err) {
    console.log(err);

    timer(timeLeft);
  }
}

const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

checkForSummary();
