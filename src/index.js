import './style/style.css';

import { loadHome } from './pages/home';
import { app } from './functions/app';
import { changeMode } from './functions/lightDarkMode';


document.addEventListener('DOMContentLoaded', () => {
    loadHome();
    changeMode()
    app();
})