// elements
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var btnSubmit = document.getElementById("btnSubmit");
var tableBody = document.getElementById("tableBody");
var nameAlert = document.getElementById("nameAlert");
var urlAlert = document.getElementById("urlAlert");

// array of objects
var sitesList = [];

// show what in local storage
if (localStorage.getItem("sites") != null) {
  sitesList = JSON.parse(localStorage.getItem("sites"));
  displayData();
}

function addItem() {
  if (validationName() && validationUrl()) {
    var site = {
      sName: siteNameInput.value,
      sUrl: siteUrlInput.value,
    };

    sitesList.push(site); // add
    clearInputs(); // clear

    localStorage.setItem("sites", JSON.stringify(sitesList)); // local storage

    displayData();
  }
}

function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function displayData() {
  container = "";

  for (var i = 0; i < sitesList.length; i++) {
    container += `<tr>
    <td>${i + 1}</td>
    <td>${sitesList[i].sName}</td>
    <td><a id="visitSite" href="${
      sitesList[i].sUrl
    }"class="btn visit"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
    <td><button id="deleteItem" onclick="deleteItem(${i})" class="btn bg delete"><i class="fa fa-trash"></i> Delete</button></td>
    </tr>
    `;
  }
  tableBody.innerHTML = container;
}

function deleteItem(index) {
  sitesList.splice(index, 1);

  localStorage.setItem("sites", JSON.stringify(sitesList)); // local storage
  displayData();
}

function validationName() {
  var name = siteNameInput.value;
  var regex = /^\w{3,}$/;

  if (regex.test(name) && !nameIsRepeat(name)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    return false;
  }
}

function validationUrl() {
  var name = siteUrlInput.value;
  var regex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/g;

  if (regex.test(name)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    urlAlert.classList.add("d-none");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    urlAlert.classList.remove("d-none");
    return false;
  }
}

function nameIsRepeat(value) {
  for (var i = 0; i < sitesList.length; i++) {
    if (value == sitesList[i].sName) {
      return true;
    }
  }
  return false;
}
