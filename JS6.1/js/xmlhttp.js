import getRequest from "../modules/xmlhttp/getRequest.js";
import postRequest from "../modules/xmlhttp/postRequest.js";

const form = document.querySelector("form");

form.addEventListener("submit", getRequest);
form.addEventListener("submit", postRequest);
