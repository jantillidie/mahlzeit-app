const message = document.getElementById("message");
const mealName = document.getElementById("meal-name");
const mealImage = document.getElementById("meal-image");
const mealTags = document.getElementById("meal-tags");
const videoLink = document.getElementById("video-link");
const ingredientsList = document.getElementById("ingredients");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function showIngredients(meal) {
  ingredientsList.innerHTML = "";

  for (let i = 1; i <= 20; i++) {
    const name = meal["strIngredient" + i];
    const amount = meal["strMeasure" + i];

    if (!name) {
      continue;
    }
    ingredientsList.innerHTML += `<li>${amount} ${name}</li>`;
  }
}

async function loadMeal() {
  if (id === null) {
    message.textContent = "Nichts ausgewählt.";
    return;
  }
  message.textContent = "Lade Rezept...";
  const data = await fetchJson(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id,
  );

  if (data === null || data.meals === null) {
    message.textContent = "Nichts gefunden.";
    return;
  }
  message.textContent = "";
  const meal = data.meals[0];
  mealName.textContent = meal.strMeal;
  mealImage.src = meal.strMealThumb;
  mealImage.alt = meal.strMeal;

  mealTags.innerHTML = `
    <span class="recipe-card-category">${meal.strCategory}</span>
    <span class="recipe-card-category">${meal.strArea}</span>
    `;
  if (meal.strYoutube) {
    videoLink.href = meal.strYoutube;
    videoLink.hidden = false;
  }
  showIngredients(meal);
  console.log(meal);
}
loadMeal();
