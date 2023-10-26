
// VARIABLES
const recipeSection = document.querySelector('#recipe');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', obtainIdParam);

// FUNCTIONS
// function obtainIdParam() {
//   const parametrosURL = new URLSearchParams(window.location.search);
//   const idMeal = parseInt(parametrosURL.get('id'));
//   console.log(parametrosURL);
//   console.log(idMeal);
//   // fetchDescription(idMeal);
// }

function obtainIdParam() {
  const parametrosURL = new URLSearchParams(window.location.search);

  if (parametrosURL.get('id') !== null) {
    const idMeal = parseInt(parametrosURL.get('id'));
    fetchDescriptionId(idMeal);
  } else {
    fetchRandomMeal();
  }
}

// Fetch when URL has ID parameter
async function fetchDescriptionId(id) {
  
  showSpinner();

  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    showDescription(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
}

// Fetch when URL has a random.php
async function fetchRandomMeal() {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const data = await response.json();
    showDescription(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
}

function showDescription(description) {

  cleanHTML();

  // console.log(description);
  const { idMeal, strMeal, strArea, strInstructions, strMealThumb, strYoutube, strCategory } = description;
  // META TAG TITLE
  const titleTag = document.getElementsByTagName('title');
  titleTag[0].innerText = strMeal;


  // recipe__contry
  const recipeContry = document.createElement('div');
  recipeContry.classList.add('recipe__contry');
  // contry__flag
  let countryName = strArea.toLowerCase();
  const contryFlag = document.createElement('img');
  contryFlag.classList.add('country__flag');
  contryFlag.src = `./assets/images/${countryName}.png`;
  contryFlag.alt = `${strArea} flag`;
  // contry__name
  const contryName = document.createElement('p');
  contryName.classList.add('contry__name');
  contryName.innerText = strArea;

  recipeContry.appendChild(contryFlag);
  recipeContry.appendChild(contryName);

  // recipe__texts
  const recipeTexts = document.createElement('div');
  recipeTexts.classList.add('recipe__texts');
  // recipe__title
  const recipeTitle = document.createElement('h1');
  recipeTitle.classList.add('recipe__title');
  recipeTitle.innerText = strMeal;
  // recipe__category
  const recipeCategory = document.createElement('p');
  recipeCategory.classList.add('recipe__category');
  recipeCategory.innerHTML = `Category: <span>${strCategory}</span>`;

  recipeTexts.appendChild(recipeTitle);
  recipeTexts.appendChild(recipeCategory);
  recipeTexts.appendChild(recipeContry);

  // recipe__picture
  const recipePicture = document.createElement('div');
  recipePicture.classList.add('recipe__picture');
  // recipe__img
  const recipeImg = document.createElement('img');
  recipeImg.classList.add('recipe__img');
  recipeImg.src = strMealThumb;
  recipeImg.alt = strMeal;
  recipePicture.appendChild(recipeImg);

  // recipe__div
  const recipeDiv = document.createElement('div');
  recipeDiv.classList.add('recipe__div');

  recipeDiv.appendChild(recipePicture);
  recipeDiv.appendChild(recipeTexts);

  // recipe__top
  const recipeTop = document.createElement('div');
  recipeTop.classList.add('recipe__top');

  recipeTop.appendChild(recipeDiv);

  recipeSection.appendChild(recipeTop);

  // RECIPE__CONTAINER
  const recipeContainer = document.createElement('div');
  recipeContainer.classList.add('container', 'recipe__container');

  // ingredients__list
  const ingredientsList = document.createElement('ul');
  ingredientsList.classList.add('ingredients__list');

  // Show ingredients and portions
  for (let i = 1; i <= 20; i++) {
    if (description[`strIngredient${i}`]) {
      const ingredient = description[`strIngredient${i}`];
      const portion = description[`strMeasure${i}`];

      const ingredientLi = document.createElement('li');
      ingredientLi.classList.add('ingredients__item');
      ingredientLi.textContent = `${portion} - ${ingredient}`;
      ingredientsList.appendChild(ingredientLi);
    }
  }

  // instructions__title
  const ingredientsTitle = document.createElement('h2');
  ingredientsTitle.classList.add('instructions__title');
  ingredientsTitle.innerText = 'Ingredients';

  // recipe__ingredients
  const recipeIngredients = document.createElement('div');
  recipeIngredients.classList.add('recipe__ingredients');

  recipeIngredients.appendChild(ingredientsTitle);
  recipeIngredients.appendChild(ingredientsList);


  // RECIPE__INSTRUCTIONS
  // recipe__instructions
  const recipeInstructions = document.createElement('div');
  recipeInstructions.classList.add('recipe__instructions');

  // instructions__text
  const instructionsText = document.createElement('p');
  instructionsText.classList.add('instructions__text');
  instructionsText.innerText = strInstructions;

  // instructions__title
  const instructionsTitle = document.createElement('h2');
  instructionsTitle.classList.add('instructions__title');
  instructionsTitle.innerText = "Let's cook!";

  recipeInstructions.appendChild(instructionsTitle);
  recipeInstructions.appendChild(instructionsText);


  // LINK TO YOUTUBE
  // instructions__link
  const instructionsLink = document.createElement('a');
  instructionsLink.classList.add('instructions__link');
  instructionsLink.href = strYoutube;
  instructionsLink.target = '_blank';
  instructionsLink.innerText = 'Watch video';
  
  recipeContainer.appendChild(recipeIngredients);
  recipeContainer.appendChild(recipeInstructions);
  recipeContainer.appendChild(instructionsLink);
  
  recipeSection.appendChild(recipeContainer);
}

function cleanHTML() {
  while (recipeSection.firstChild) {
    recipeSection.removeChild(recipeSection.firstChild);
  }
}

function showSpinner() {

  cleanHTML();

  const spinner = document.createElement('div');
  spinner.classList.add('sk-chase');

  spinner.innerHTML = `
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  `;

  recipeSection.appendChild(spinner);
}