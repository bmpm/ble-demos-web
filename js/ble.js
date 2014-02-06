var adapterPath = null;
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

function addItemList(properties, ulItem, path) {
  var devList = document.getElementById(ulItem);
  var devItem = document.createElement("li");

  devItem.setAttribute("data-name", properties["Alias"]);
  devItem.id = "discovery" + path;

  devItem.addEventListener("click", function (e) {
    console.log("Pair to device (clicked): " + this.getAttribute("data-name"));

    // FIXME: Add pair to device function
  });

  var devA = document.createElement("a");
  var devP = document.createElement("p");
  var devTitle = document.createTextNode(properties["Alias"]);

  devP.appendChild(devTitle);
  devA.appendChild(devP);
  devItem.appendChild(devA);
  devList.appendChild(devItem);
}

function connectSuccess() {
  bus = cloudeebus.SystemBus();
  console.log("Connected to cloudeebus");

  bus.getObject("org.bluez", "/",
      function (proxy) { proxy.GetManagedObjects().then(getDevices, errorCB); },
      function (error) { console.log("Device list: " + error); });
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

function rebuildDevList() {
  bus.getObject("org.bluez", "/",
    function (proxy) { proxy.GetManagedObjects().then(getDevices, errorCB); },
    function (error) { console.log("Device list: " + error); });
}

function setEnabledItem(id, value) {
  var item = document.getElementById(id);

  if (item == null)
    return;
  item.setAttribute("aria-disabled", value);
}

function propertiesChanged(iface, changed, invalidated) {
  if (iface != "org.bluez.Device1")
    return;

  console.log("PropertiesChanged: " + iface + ", Name: " + this.Alias);

  if (changed["Connected"] == null)
    return;

  if (changed["Connected"] == 0) {
    customConfirm("WARNING", "Device " + this.Alias + " disconnected", "danger");
    setEnabledItem(this.objectPath, "true");
  } else
    setEnabledItem(this.objectPath, "false");
}

function getDevices(objs) {
  clearAllList("dev-list");

  var devList = addHeaderList("Available Devices (Paired)", null, "dev-list", "dev-list-ul");

  for (o in objs) {

    if (adapterPath == null && objs[o]["org.bluez.Adapter1"] != null) {
      console.log("Adapter: " + o);
      adapterPath = o;
    }

    if (objs[o]["org.bluez.Device1"] == null)
      continue;

      // Ignore temporary devices
      if (objs[o]["org.bluez.Device1"]["Paired"] == 0)
        continue;

      console.log("Device paired: " + objs[o]["org.bluez.Device1"]["Alias"]);
      bus.getObject("org.bluez", o,
        function (proxy) { proxy.connectToSignal("org.freedesktop.DBus.Properties",
                          "PropertiesChanged", propertiesChanged, errorCB); },
        function (error) { console.log("Properties changed handler: " + error); });


      var devItem = document.createElement("li");
      devItem.setAttribute("data-name", objs[o]["org.bluez.Device1"]["Alias"]);
      devItem.id = o;
      if (objs[o]["org.bluez.Device1"]["Connected"] == 0)
        devItem.setAttribute("aria-disabled", "true");
      devItem.addEventListener("click", function (e) {
          console.log("Clicked device: " + this.getAttribute("data-name"));

          // FIXME: call thermometer value window
      });

      var devA = document.createElement("a");
      var devP = document.createElement("p");
      var devTitle = document.createTextNode(objs[o]["org.bluez.Device1"]["Alias"]);

      devP.appendChild(devTitle);
      devA.appendChild(devP);
      devItem.appendChild(devA);
      devList.appendChild(devItem);
  }
}

function getTMPDevices(objs) {
  for (o in objs) {
    if (objs[o]["org.bluez.Device1"] == null)
      continue;

    // Get temporary devices and not connect devices (already paired)
    if (objs[o]["org.bluez.Device1"]["Connected"] == 1)
      continue;

    console.log("Device discovery: " + objs[o]["org.bluez.Device1"]["Alias"] +
                ", path: " + o);
    addItemList(objs[o]["org.bluez.Device1"], "dev-disc-list-ul", o);
  }
}

function createDiscList() {
  clearAllList("dev-disc-list");
  addHeaderList("Devices Found", "spin-dev-disc", "dev-disc-list", "dev-disc-list-ul");
  document.querySelector('#btn-stop-disc').innerHTML = "STOP";

  bus.getObject("org.bluez", "/",
    function (proxy) { proxy.GetManagedObjects().then(getTMPDevices, errorCB); },
    function (error) { console.log("Device discovery list: " + error); });
}
