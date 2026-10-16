async function loadMeals() {
  const data = await
    fetchJson("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
  console.log(data)
}

loadMeals()