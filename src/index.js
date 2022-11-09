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

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  let infoCountry = event.target.value.trim();
  if (infoCountry === '') {
    return (refs.list.innerHTML = ''), (refs.container.innerHTML = '');
  }

  fetchCountries(infoCountry)
    .then(country => {
      refs.list.innerHTML = '';
      refs.container.innerHTML = '';
      if (country.length === 1) {
        refs.container.insertAdjacentHTML(
          'beforeend',
          showCountryInfo(country)
        ) 
      } else if (country.length >= 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
            } else {
             refs.list.insertAdjacentHTML('beforeend', showCountry(country)),
          refs.container.innerHTML = '';
      }
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );

  console.log(fetchCountries(infoCountry));
}

function showCountry(country) {
  const listCountry = country.map(item =>
        `<li class='list'><img class="list__img"src="${item.flags.svg}" alt="${item.name.official}"><p class="card__title">${item.name.common}</p></li>`
    )
    .join('');
  return listCountry;
}

function showCountryInfo(country) {
  const markup = country
    .map(
      item => `<ul class="card__list"><li class="card__item__title"><img class="card__img"src="${
        item.flags.svg
      }" alt="${item.name.official}"><h1 class="card__title">${
        item.name.common
      }</h1></</li>
    <li class="card__item"><span class = 'card__text'>Capital:</span> ${
      item.capital
    }</li><li class="card__item"><span class = 'card__text'>Population:</span> ${
        item.population
      }</li><li class="card__item"><span class = 'card__text'>Languages:</span> ${Object.values(
        item.languages
      ).join(', ')}</li></ul>`
    )
    .join('');
  return markup;
}
