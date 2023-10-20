// The Cocktail DB 
// https://www.thecocktaildb.com/api.php
// The Meal DB 
// https://www.themealdb.com/api.php

function app() {
  // VARIABLES
  const divContainer = document.querySelector('#categories');
  const sectionFood = document.querySelector('.section');

  // document.addEventListener('DOMContentLoaded', fetchData);
  fetchData();

  async function fetchData() {
    try {
      const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
      const response = await fetch(url);
      // console.log(response);
      if (response.status === 404) {
        // SORRY PAGE NOT FOUND
      } else {
        // PAGINA FUNCIONA
        const data = await response.json();
        // console.log(data.categories);
        showCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function showCategories(categories) {
    categories.forEach(category => {
      const { idCategory, strCategory, strCategoryThumb } = category;
      // DIV
      const platillo = document.createElement('button');
      platillo.classList.add('categories__platillo');
      platillo.dataset.id = strCategory;

      // IMG
      const imgPlatillo = document.createElement('img');
      imgPlatillo.src = strCategoryThumb;
      imgPlatillo.classList.add('categories__img');

      // TITLE
      const titlePlatillo = document.createElement('h2');
      titlePlatillo.classList.add('categories__title');
      titlePlatillo.innerText = strCategory;


      platillo.appendChild(imgPlatillo);
      platillo.appendChild(titlePlatillo);

      divContainer.appendChild(platillo);
    });
  }

  divContainer.addEventListener('click', showTarget);

  function showTarget(e) {
    const namePlatillo = e.target.parentElement.getAttribute('data-id');
    console.log(namePlatillo);
    fetchDish(namePlatillo);
  }

  async function fetchDish(namePlatillo) {
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${namePlatillo}`;
      const response = await fetch(url);
      const data = await response.json();
      showDishContainer(data.meals);
    } catch (error) {
      console.log(error);
    }
  }

  function showDishContainer(meals) {

    // Limpiar HTML
    limpiarHTML();

    meals.forEach(meal => {
      const { idMeal, strMeal, strMealThumb } = meal
      // console.log(meal);
      // ESCRIBIR HTML PARA VER COMO SE MOSTRARA CADA PLATILLO
      const aPlatillo = document.createElement('a');
      aPlatillo.classList.add('platillo__link');
      aPlatillo.href = `recipe.html?id=${idMeal}`;
      aPlatillo.target = '_blank';

      // IMG
      const imgPlatillo = document.createElement('img');
      imgPlatillo.src = strMealThumb;
      imgPlatillo.classList.add('img');

      // TITLE
      const titlePlatillo = document.createElement('h2');
      titlePlatillo.classList.add('title');
      titlePlatillo.innerText = strMeal;

      aPlatillo.appendChild(imgPlatillo);
      aPlatillo.appendChild(titlePlatillo);

      sectionFood.appendChild(aPlatillo);
    });
  }

  function limpiarHTML() {
    while (sectionFood.firstChild) {
      sectionFood.removeChild(sectionFood.firstChild);
    }
  }


}

document.addEventListener('DOMContentLoaded', app);