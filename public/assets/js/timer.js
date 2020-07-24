let timeleft = 120;
function timer() {
  setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(timer);
      location.reload();
    }
    document.querySelector(
      '.msg'
    ).innerHTML = `Error fetching, wait for page to reload in ${timeleft} seconds`;

    timeleft -= 1;
  }, 1000);
}
