var bus = null;

function errorCB(error) {
  console.log("error: " + error + "\n");
}

function connectSuccess() {
  bus = cloudeebus.SystemBus();
  console.log("Connected to cloudeebus");
}

function connect() {
  cloudeebus.connect("ws://localhost:9000", null, connectSuccess, errorCB);
}
