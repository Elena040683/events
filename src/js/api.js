import {alert, error, success, info} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 	'JAKSNyQJNxZ2b0OS1CqTuvlXp3WrqCnE';

class EventsApi {
  constructor() {
    this.searchQuery = '';
    this.country = '';
    this.page = 0; 
    this.eventsPerPage = 20;
    this.eventId = '';
  }

  async getEventsFirstLoad() {
    try {
      const result = await fetch(`${BASE_URL}/events?&size=${this.eventsPerPage}&page=${this.page}&preferredCountry=${('us', 'ca')}&apikey=${API_KEY}`);
      const dataFromServer = await result.json();
      return dataFromServer._embedded.events
      // console.log(dataFromServer._embedded.events);
    } catch (error) {
      console.log(error);
    }
  }

  async getEventsByInputRequest() {
    try {
      const result = await fetch(`${BASE_URL}/events?&keyword=${this.searchQuery}&countryCode=${this.country}&apikey=${API_KEY}`);
      const dataFromServer = await result.json();
        if (!dataFromServer.hasOwnProperty('_embedded')){
          info('There are no events found by your request.')
        }
        return dataFromServer._embedded.events;
    } catch (error) {
      console.log(error);
    }
  }

  //size=${this.eventsPerPage}&page=${this.page}

  async getEventsById(id) {
    this.eventId = id;
    try {
      const result = await fetch(`${BASE_URL}/events?&id=${this.eventId}&apikey=${API_KEY}`);
      const dataFromServer = await result.json();
      return dataFromServer._embedded.events
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get сountryQueryKey() {
    return this.country;
  }

  set сountryQueryKey(newCountry) {
    this.country = newCountry;
  }

  get numberOfPage() {
    return this.page;
  }

  set numberOfPage(newPage) {
    this.page = newPage;
  }

  get numberOfEventsOnOnePage() {
    return this.eventsPerPage;
  }

  set numberOfEventsOnOnePage(newValue) {
    this.eventsPerPage = newValue;
  }

  get EventID() {
    return this.eventId;
  }

  set EventID(newId) { 
    this.eventId = newId;
  }
}

export default EventsApi;
