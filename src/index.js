import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from '../src/fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  container: document.querySelector('.country-info'),
};

console.log(refs.container);
console.log(refs.list);

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const infoCountry = event.target.value.trim();
  fetchCountries(infoCountry)
    .then(showCountry)
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
  if (!infoCountry) {
    refs.list.innerHTML = '';
    refs.container.innerHTML = '';
    return;
  }
  console.log(fetchCountries(infoCountry));
}

function showCountry(country) {
  if (2 >= country.length <= 10) {
    const listCountry = country
      .map(
        item =>
          `<li class = 'list'><img class="list__img"src="${item.flags.svg}" alt="${item.name.official}"><p class="card__title">${item.name.official}</p></li>`
      )
      .join('');
    refs.container.innerHTML = '';
    refs.list.innerHTML = listCountry;
  }
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

    const markup = country
      .map(
        item =>
          `<div class="card"><div><img class="card__img"src="${item.flags.svg}" alt="${item.name.official}"></div><div class="card__body"><h1 class="card__title">${item.name}</h1><ul class="card__list"><li class="card__item">Capital: ${item.capital}</li><li class="card__item">Population: ${item.population}</li><li class="card__item">Languages: ${item.languages}</li></ul></div></div>`
      )
      .join('');
  return
    refs.container.innerHTML = markup;
    refs.list.innerHTML = '';

}
