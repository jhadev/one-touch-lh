const run = document.getElementById('run');
const section = document.querySelector('#data');

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
  section.innerHTML = '';
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

  summary.forEach((test) => {
    const div = document.createElement('div');
    div.setAttribute('id', 'score-info');
    const link = document.createElement('a');
    const scoreLink = document.createElement('a');
    link.textContent = `${test.url}`;
    link.href = `${test.url}`;
    link.target = '_blank';

    scoreLink.textContent = `View HTML Report`;
    scoreLink.href = `${path}/${test.html}`;
    const score = document.createElement('p');
    score.textContent = `Performance Score: ${
      test.detail.performance * 100 || 'no data'
    }`;
    article.appendChild(div);
    div.appendChild(link);
    div.appendChild(score);
    div.appendChild(scoreLink);
  });

  run.disabled = false;
}

run.addEventListener('click', async function () {
  waiting();
  try {
    const response = await timeout(1000000, fetch('/api/lh'));
    console.log(response);
    if (response.status === 200) {
      await makeRequest(response);
    }
  } catch (err) {
    console.log(err);
  }
});

checkForSummary();
