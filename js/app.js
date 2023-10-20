// The Cocktail DB 
// https://www.thecocktaildb.com/api.php
// The Meal DB 
// https://www.themealdb.com/api.php

function app() {
  // VARIABLES
  const divCategories = document.querySelector('#categories');
  const cardsContainer = document.querySelector('#cardsContainer');

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
      const dishBtn = document.createElement('button');
      dishBtn.classList.add('categories__card');
      dishBtn.dataset.id = strCategory;

      // IMG
      const mealImg = document.createElement('img');
      mealImg.src = strCategoryThumb;
      mealImg.classList.add('categories__img');

      // TITLE
      const mealTitle = document.createElement('h2');
      mealTitle.classList.add('categories__title');
      mealTitle.innerText = strCategory;


      dishBtn.appendChild(mealImg);
      dishBtn.appendChild(mealTitle);

      divCategories.appendChild(dishBtn);
    });
  }

  divCategories.addEventListener('click', showTarget);

  function showTarget(e) {
    const dishName = e.target.parentElement.getAttribute('data-id');
    console.log(dishName);
    fetchDish(dishName);
  }

  async function fetchDish(dishName) {
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${dishName}`;
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
      const { idMeal, strMeal, strMealThumb } = meal;
      // a CARD
      const mealCard = document.createElement('a');
      mealCard.classList.add('card');
      mealCard.href = `recipe.html?id=${idMeal}`;
      mealCard.target = '_blank';


      // ========================================================
      // CAMBIAR CLASES DE LAS CARDS PARA QUE TENGAN MEJOR SENTIDO
      // ========================================================


      // IMG
      const mealImg = document.createElement('img');
      mealImg.src = strMealThumb;
      mealImg.classList.add('card__img');

      // TITLE
      const mealTitle = document.createElement('h3');
      mealTitle.classList.add('card__title');
      mealTitle.innerText = strMeal;

      mealCard.appendChild(mealImg);
      mealCard.appendChild(mealTitle);

      cardsContainer.appendChild(mealCard);
    });
  }

  function limpiarHTML() {
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
  }


}

document.addEventListener('DOMContentLoaded', app);