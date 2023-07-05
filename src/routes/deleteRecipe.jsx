import { redirect } from "react-router-dom";

export async function action({ params }) {
  const recipesResponse = await fetch(`http://localhost:3000/recipes`);
  const recipes = await recipesResponse.json();
  const recipe = recipes.find((recipe) => recipe.title === params.recipeTitle);
  if (!recipe) {
    console.error("Recipe not found");
    return { recipe: null };
  }

  const recipeId = recipe.id;
  const recipeResponse = await fetch(
    `http://localhost:3000/recipes/${recipeId}`,
    {
      method: "Delete",
    }
  );
  return redirect("/recipes");
}
