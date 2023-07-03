import { useLoaderData, useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";

export const loader = async ({ params }) => {
  const url = "http://localhost:3000/recipes";
  const response = await fetch(url);
  const recipes = await response.json();
  return { data: recipes };
};

const RecipeList = () => {
  const { data: recipes } = useLoaderData();
  const { category } = useParams();

  // Filter recipes based on the selected category and search query
  const filteredRecipes = recipes.filter((recipe) => {
    if (category && category.toLowerCase() !== "all categories") {
      return recipe.category.some(
        (recipeCategory) =>
          recipeCategory.toLowerCase() === category.toLowerCase()
      );
    }
    return true;
  });

  // Render recipe cards
  const recipeCards = filteredRecipes.map((recipe, index) => (
    <div key={index} className="flex items-stretch">
      <div className="recipe-card-container flex-grow">
        <RecipeCard item={recipe} />
      </div>
    </div>
  ));

  return (
    <div>
      <div className="recipes-title text-4xl font-bold text-center mb-4">
        {category} Recipes
      </div>
      <div className="recipe-grid grid grid-cols-4 gap-4">{recipeCards}</div>
    </div>
  );
};

export default RecipeList;
