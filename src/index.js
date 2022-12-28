import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const MAX_COUNTRIES = 10;
const TARGET_COUNTRY = 1;

fetchCountries('ukraine');

const refs = {
  input: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(onSearchCountries, DEBOUNCE_DELAY)
);

function onSearchCountries(e) {
  const name = e.target.value.trim();
  if (name.length === 0) {
    clearCountry();
    clearCountryList();
    return;
  }
  fetchCountries(name).then(inputShowResult).catch(inputShowError);
}

function inputShowResult(e) {
  if (e.length >= MAX_COUNTRIES) {
    clearCountry();
    clearCountryList();
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (e.length === TARGET_COUNTRY) {
    clearCountryList();
    showCountry(e[0]);
  } else {
    clearCountry();
    showCountryList(e);
  }
}

function inputShowError() {
  clearCountry();
  clearCountryList();
  Notify.failure('Oops, there is no country with that name');
}

function showCountry(country) {
  refs.countryInfo.innerHTML = `
    <div class="country-info__title">
        <img src="${country.flags.svg}" width="35" alt="Flag${
    country.official
  }">
        <h1>${country.name.official}</h1>
      </div>
      <ul class="country-info__items">
        <li><b>Capital: </b>${country.capital}</li>
        <li><b>Population: </b>${country.population}</li>
        <li><b>Language: </b>${Object.values(country.languages)}</li>
      </ul>
    `;
}

function clearCountry() {
  refs.countryInfo.innerHTML = '';
}

function showCountryList(list) {
  refs.countryList.innerHTML = list
    .map(list => {
      return `<li>
        <img src="${list.flags.svg}" width="30" alt=""> ${list.name.official}
      </li>
    `;
    })
    .join('');
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}
