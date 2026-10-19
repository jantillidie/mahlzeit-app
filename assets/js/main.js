const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const message = document.getElementById("message");
const recipesSection = document.getElementById("recipes");

function showMeals(meals) {
  recipesSection.innerHTML = "";
  for (const meal of meals) {
    recipesSection.innerHTML += `
    <article class="recipes-card">
        <div class="recipe-card-img-div">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-card-img" />
        </div>
        <div class="recipe-card-content">
            <div class="recipe-card-categories">
                <span class="recipe-card-category"></span>
            </div>
            <h3 class="recipe-card-title">${meal.strMeal}</h3>
            <a href="rezept.html?id=${meal.idMeal}" class="recipe-card-link">Rezept ansehen →</a>
        </div>
    </article>
    `;
  }
}

async function searchMeals(term) {
  message.textContent = "Lade Rezepte...";
  recipesSection.innerHTML = "";

  const data = await fetchJson(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term,
  );

  if (data === null) {
    message.textContent = "Kaputt. Mach ma nochmal.";
    return;
  }
  if (data.meals === null) {
    message.textContent = "Nichts dabei mit '" + term + "'.";
    return;
  }

  message.textContent = "";
  showMeals(data.meals);
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchMeals(searchInput.value);
});

searchMeals("veg");
