document.querySelector('#btn-disc-back').addEventListener ('click', function () {
  document.querySelector('#dev-discovery').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
  if (document.querySelector('#btn-stop-disc').innerHTML != "START")
    deviceScanOff();
  rebuildDevList();
});

document.querySelector('#btn-stop-disc').addEventListener ('click', function () {
  if (this.innerHTML == "STOP") {
    deviceScanOff();
    this.innerHTML = "START";
  } else {
    deviceScanOn();
    this.innerHTML = "STOP";
  }
});

document.querySelector('#dev-search').addEventListener ('click', function () {
  createDiscList();

  document.querySelector('#dev-discovery').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
  deviceScanOn();
});

document.querySelector('#btn-rem-back').addEventListener ('click', function () {
  document.querySelector('#remove-device').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
  rebuildDevList();
});

document.querySelector('#dev-rem').addEventListener ('click', function () {
  createRemList();

  document.querySelector('#remove-device').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#confirm').addEventListener ('click', function () {
  this.className = 'fade-out';
});

document.querySelector('#btn-therm-back').addEventListener ('click', function () {
  document.querySelector('#thermometer').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
