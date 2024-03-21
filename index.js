const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipecloseBtn = document.querySelector('.recipe-close-Btn');


// Function to feth Ingredients and measurements
const fetchIngredients = (meal) => {
  let IngredientsLists = "";
  for(let i=1; i<=20; i++)
  {
    const Ingredients = meal[`strIngredient${i}`];
    if(Ingredients)
    {
      const measure = meal[`strMeasure${i}`];
      IngredientsLists += `<li>${measure} ${Ingredients}</li>`
    }
    else{
      break;
    }
  }
  return IngredientsLists;
}
// Function to get recipes

const openRecipePopup = (meal) => 
{
  recipeDetailsContent.innerHTML = `
    <h2 class="RecipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="IngredientList">${fetchIngredients(meal)}</ul>
    <div class="RecipeInstructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
  `
  

  recipeDetailsContent.parentElement.style.display = "block";
}


const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
try
{

  
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();

  recipeContainer.innerHTML = "";
  response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    ` 
    const button = document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);


    //Adding EventListener to recipe button
    button.addEventListener('click', () => {
      openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);

    document.getElementById("img_holder").innerHTML = " ";

  });
}
catch (error)
{
  recipeContainer.innerHTML = "<h2>Error in Fetching Recipes :(</h2>";
  document.getElementById("img_holder").innerHTML = "<img src='img/not_found.gif'/>";
}
  
}

recipecloseBtn.addEventListener('click', ()=> {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if(!searchInput)
  {
    recipeContainer.innerHTML = `<h2> Type the Meal Name in Search Box.</h2>`;
    return;
  }
  fetchRecipes(searchInput);
  // console.log("Button Clicked"); 
});
