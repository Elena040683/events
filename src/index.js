import './scss/main.scss';
import countriesCode from './js/countries';

import header from './template/header.hbs';
import createCountrySelectList from './js/select-country-options';
import main from './template/main.hbs';
import EventsApi from './js/api.js';
import eventCards from './template/eventCards.hbs';

const app = document.querySelector('#root');
app.insertAdjacentHTML('beforeend', header());
app.insertAdjacentHTML('beforeend', main());

createCountrySelectList(countriesCode);

const apiService = new EventsApi();

const ul = document.querySelector('#js-events');
window.addEventListener("DOMContentLoaded", onFirstLoad);

function onFirstLoad() {
  apiService.getEventsFirstLoad()
  // .then((data) => console.log(data))
  .then((dataArr) => ul.insertAdjacentHTML("beforeend", eventCards(dataArr)))
  .catch((err) => console.log(err))
}

// Логика поиска и отрисовки

const form = document.querySelector('#js-search-form');
const searchField = document.querySelector('#input-event');
const countryCode = document.querySelector('#select-country');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  // console.dir(e.target.elements.search.value);
  // console.dir(e.target.elements.country.value.slice(0));

  apiService.searchQuery = e.target.elements.search.value;
  apiService.country = e.target.elements.country.value.slice(0);

  ul.innerHTML = '';
  apiService.getEventsByInputRequest()
  .then((dataArr) => ul.insertAdjacentHTML("beforeend", eventCards(dataArr)))
  .catch((err) => console.log(err))
}


