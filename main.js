const button = document.querySelector("#clear_storage");

let data = {
  firstContact: [{ id: "obj_1", data: { text: "object 1" } }],
  negotiation: [{ id: "obj_2", data: { text: "object 2" } }],
  contractAccepted: [{ id: "obj_3", data: { text: "object 3" } }],
  userConnected: [{ id: "obj_4", data: { text: "object 4" } }],
};

function render(d) {
  for (icon in d) {
    // console.log(icon);
    let el_id =
      icon == "firstContact"
        ? "col_1"
        : icon == "negotiation"
        ? "col_2"
        : icon == "contractAccepted"
        ? "col_3"
        : "col_4";
    let element = document.querySelector(`#${el_id}`);
    for (i of d[icon]) {
      cElement(i.id, i.data, element);
    }
  }

  function cElement(id, data, el) {
    let div = document.createElement("div");
    div.setAttribute("id", id);
    div.setAttribute("class", "c_object");
    div.setAttribute("draggable", "true");
    div.setAttribute("ondragstart", "drag(event)");
    let par = document.createElement("p");
    par.textContent = data.text;
    div.appendChild(par);
    el.appendChild(div);
  }
}

render(data);

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  console.log(ev.dataTransfer.getData("text"), ev.target.id);
  aa(ev.target.id, ev.dataTransfer.getData("text"));
  //   window.localStorage.clear();
}

function clear(ev) {
  ev.dataTransfer.clearData();
}

function aa(col, obj) {
  let c = window.localStorage.getItem(col);
  let arr = [];
  if (c != "" && c != null) {
    Array.isArray(c) ? arr.push(...c, obj) : arr.push(c, obj);
    window.localStorage.setItem(col, arr);
  } else {
    window.localStorage.setItem(col, obj);
  }
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  window.localStorage.clear();
  alert("Storage was cleared!");
});
