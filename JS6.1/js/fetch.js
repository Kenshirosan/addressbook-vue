import getRequest from '../modules/fetch/getRequest.js';
import postRequest from '../modules/fetch/postRequest.js';

const form = document.querySelector('form');

form.addEventListener('submit', getRequest);
form.addEventListener('submit', postRequest);
