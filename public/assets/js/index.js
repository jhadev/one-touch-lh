const run = document.getElementById('run');
const section = document.querySelector('#data');

function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
}

function waiting() {
  const h1 = document.createElement('h1');
  h1.textContent = 'waiting';
  h1.classList.add('msg');

  section.appendChild(h1);
}

async function makeRequest(response) {
  const results = await response.json();
  const { path, summary, message } = results;

  document.querySelector('.msg').textContent = '';

  const pre = document.createElement('pre');
  const a = document.createElement('a');
  pre.textContent = `${JSON.stringify(results, null, 2)}`;

  section.appendChild(pre);
  a.href = path;
  a.textContent = 'Results here';
  section.appendChild(a);
}

run.addEventListener('click', async function () {
  waiting();
  try {
    const response = await timeout(1000000, fetch('api/lh'));
    console.log(response);
    makeRequest(response);
  } catch (err) {
    console.log(err);
  }
});
