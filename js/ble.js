var bus = null;

function addHeaderList(header, spin, list, ulId) {
  var devListContainer = document.getElementById(list);
  var item = document.createElement("header");

  item.appendChild(document.createTextNode(header));
  if (spin != null) {
    var spinItem = document.createElement("progress");
    spinItem.id = spin;
    spinItem.style.marginLeft = "15px";
    spinItem.style.marginBottom = "10px";
    item.appendChild(spinItem);
  }
  devListContainer.appendChild(item);

  var devList = document.createElement("ul");
  devList.id = ulId;
  devListContainer.appendChild(devList);

  return devList;
}

function clearAllList(list) {
  listView = document.getElementById(list);

  while (listView.hasChildNodes()) {
      listView.removeChild(listView.lastChild);
  }
}

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

function callRemoveDevice() {
}

function customConfirm(title, msg, type) {
  document.getElementById("conf-title").innerHTML = title;
  document.getElementById("conf-name-disc").innerHTML = msg;
  document.getElementById("conf-button").className = type;

  document.querySelector('#confirm').className = 'fade-in';
}
