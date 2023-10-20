
// VARIABLES
const recetaContainer = document.querySelector('#receta');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', obtainIdParam);

// FUNCTIONS
function obtainIdParam() {
  const parametrosURL = new URLSearchParams(window.location.search);
  const idMeal = parseInt(parametrosURL.get('id'));
  console.log(idMeal);
  fetchDescription(idMeal);
}

async function fetchDescription(id) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.meals);
    showDescription(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
}

function showDescription(description) {
  console.log(description);
  const { strMeal, strArea, strInstructions, strMealThumb, strYoutube } = description;
  // META TAG TITLE
  const titleTag = document.getElementsByTagName('title');
  titleTag[0].innerText = strMeal;

  // TITLE
  const titleMeal = document.createElement('h1');
  titleMeal.innerText = strMeal;
  
  // CONTRY DIV
  const countryMealDiv = document.createElement('div');
  countryMealDiv.classList.add('contry__div');

  let countryName = strArea.toLowerCase();
  // DIV IMG
  const countryMealImg = document.createElement('img');
  countryMealImg.src = `./assets/images/${countryName}.png`;
  countryMealImg.classList.add('country__flag');
  // DIV COUNTRY NAME
  const contryMealText = document.createElement('p');
  contryMealText.innerText = strArea;

  countryMealDiv.appendChild(countryMealImg);
  countryMealDiv.appendChild(contryMealText);

  // IMG
  const imgMeal = document.createElement('img');
  imgMeal.src = strMealThumb;
  imgMeal.width = '200';
  
  // INSTRUCTIONS
  const instructionsMeal = document.createElement('p');
  instructionsMeal.innerText = strInstructions;

  // LINK TO YT
  const linkMeal = document.createElement('a');
  linkMeal.href = strYoutube;
  linkMeal.target = '_blank';
  linkMeal.innerText = 'Ver video';


  recetaContainer.appendChild(titleMeal);
  recetaContainer.appendChild(countryMealDiv);
  recetaContainer.appendChild(imgMeal);
  recetaContainer.appendChild(instructionsMeal);
  recetaContainer.appendChild(linkMeal);
}