function app() {
  // VARIABLES
  const divCategories = document.querySelector('#categories');
  const cardsSection = document.querySelector('.cards__section');
  const cardsContainer = document.querySelector('#cards-container');

  const form = document.querySelector('#form');
  const inputEmail = document.querySelector('#email');
  const successMessage = document.querySelector('.newsletter__success');

  fetchData();

  async function fetchData() {
    try {
      const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
      const response = await fetch(url);
      if (response.status === 404) {
        // SORRY PAGE NOT FOUND
      } else {
        // PAGINA IS WORKING
        const data = await response.json();
        showCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function showCategories(categories) {
    categories.forEach(category => {
      const { strCategory, strCategoryThumb } = category;
      // DIV
      const dishA = document.createElement('a');
      dishA.classList.add('categories__card');
      dishA.href = '#cards-container';
      dishA.dataset.id = strCategory;

      // IMG
      const mealImg = document.createElement('img');
      mealImg.src = strCategoryThumb;
      mealImg.classList.add('categories__img');

      // TITLE
      const mealTitle = document.createElement('h2');
      mealTitle.classList.add('categories__title');
      mealTitle.style.color = 'black';
      mealTitle.innerText = strCategory;


      dishA.appendChild(mealImg);
      dishA.appendChild(mealTitle);

      divCategories.appendChild(dishA);
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

    cleanHTMLSection();

    const recipesLength = meals.length;

    const cardsSectionTitle = document.createElement('h2');
    cardsSectionTitle.classList.add('cards__section-title')
    cardsSectionTitle.innerHTML = `(${recipesLength}) Recipes`;
    cardsSection.appendChild(cardsSectionTitle);

    // Clean HTML
    cleanHTML();

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
      mealImg.loading = 'lazy';
      mealImg.src = strMealThumb;
      mealImg.alt = strMeal;
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

  function cleanHTML() {
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
  }

  function cleanHTMLSection() {
    while (cardsSection.firstChild) {
      cardsSection.removeChild(cardsSection.firstChild);
    }
  }

  // FORMS

  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  let emailStatus = false;
  let email = '';

  inputEmail.addEventListener('keyup', validarEmail);

  function validarEmail(e) {
    if (!regex.test(inputEmail.value)) {
      inputEmail.style.border = '2px solid red';
      input = false;
    } else {
      inputEmail.style.border = '2px solid green';
      emailStatus = true;
      email = e.target.value;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
  
    if (emailStatus) {
      form.reset();
      successMessage.classList.add('newsletter__success--active');
      setInterval(() => {
        successMessage.classList.remove('newsletter__success--active');
      }, 3000);
      return;
    }

    inputEmail.style.border = '2px solid red';
  })
}

document.addEventListener('DOMContentLoaded', app);