// The Cocktail DB 
// https://www.thecocktaildb.com/api.php
// The Meal DB 
// https://www.themealdb.com/api.php

function app() {
  // VARIABLES
  const divCategories = document.querySelector('#categories');
  const cardsSection = document.querySelector('.cards__section');
  const cardsContainer = document.querySelector('#cards-container');
  
  const randomBtn = document.querySelector('#random-meal');

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

    cardsSection.style.margin = '5rem auto';

    limpiarHTMLSECTION();

    const recipesLength = meals.length;

    const cardsSectionTitle = document.createElement('h2');
    cardsSectionTitle.classList.add('cards__section-title')
    cardsSectionTitle.innerHTML = `(${recipesLength}) Recipes`;
    cardsSection.appendChild(cardsSectionTitle);

    // Limpiar HTML
    limpiarHTML();

    meals.forEach(meal => {
      const { idMeal, strMeal, strMealThumb } = meal;
      // a CARD
      const mealCard = document.createElement('a');
      mealCard.classList.add('card');
      mealCard.href = `recipe.html?id=${idMeal}`;
      mealCard.target = '_blank';

      // DIV IMG
      const mealDivImg = document.createElement('div');
      mealDivImg.classList.add('card__picture');

      // IMG
      const mealImg = document.createElement('img');
      mealImg.src = strMealThumb;
      mealImg.classList.add('card__img');

      mealDivImg.appendChild(mealImg);

      // TITLE
      const mealTitle = document.createElement('h3');
      mealTitle.classList.add('card__title');
      mealTitle.innerText = strMeal;

      mealCard.appendChild(mealDivImg);
      mealCard.appendChild(mealTitle);

      cardsContainer.appendChild(mealCard);
    });

    cardsSection.appendChild(cardsContainer);

  }

  function limpiarHTML() {
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
  }

  function limpiarHTMLSECTION() {
    while (cardsSection.firstChild) {
      cardsSection.removeChild(cardsSection.firstChild);
    }
  }


}

document.addEventListener('DOMContentLoaded', app);