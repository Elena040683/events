import './scss/main.scss';
import header from './template/header.hbs';
import hero from './template/hero.hbs'

const app = document.querySelector('#root');

app.insertAdjacentHTML('beforeend', header());
app.insertAdjacentHTML('beforeend', hero());


