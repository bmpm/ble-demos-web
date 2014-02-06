document.querySelector('#btn-disc-back').addEventListener ('click', function () {
  document.querySelector('#dev-discovery').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

document.querySelector('#btn-stop-disc').addEventListener ('click', function () {
  if (this.innerHTML == "STOP") {
    this.innerHTML = "START";
  } else {
    this.innerHTML = "STOP";
  }
});

document.querySelector('#dev-search').addEventListener ('click', function () {
  document.querySelector('#dev-discovery').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-rem-back').addEventListener ('click', function () {
  document.querySelector('#remove-device').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

document.querySelector('#dev-rem').addEventListener ('click', function () {
  document.querySelector('#remove-device').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});

