import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const { title } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recipes`);
        if (!response.ok) {
          throw new Error("Recipe not found");
        }
        const data = await response.json();

        // Replace hyphens with spaces in the title
        const formattedTitle = title.replace(/-/g, " ");

        const filteredRecipe = data.find(
          (recipe) =>
            recipe.title.toLowerCase() === formattedTitle.toLowerCase()
        );
        if (!filteredRecipe) {
          throw new Error("Recipe not found");
        }
        setRecipe(filteredRecipe);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-page">
      <div className="recipe-page-image">
        <img src={recipe.img} alt={recipe.title} className="w-full h-auto" />
      </div>
      <div className="recipe-page-content">
        <h1 className="recipe-page-title text-3xl font-bold mb-2">
          {recipe.title}
        </h1>
        <div className="recipe-page-details">
          <p className="recipe-page-category text-gray-500 mb-1">
            Category: {recipe.category.join(", ")}
          </p>
          <p className="recipe-page-price text-gray-500 mb-4">
            Price: {recipe.price}
          </p>
        </div>
        <p className="recipe-page-desc text-lg mb-4">{recipe.desc}</p>
        <div className="recipe-page-ingredients">
          <h2 className="recipe-page-subtitle text-xl font-semibold mb-2">
            Ingredients
          </h2>
          <ul className="recipe-page-ingredients-list list-disc pl-6 mb-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="recipe-page-instructions">
          <h2 className="recipe-page-subtitle text-xl font-semibold mb-2">
            Instructions
          </h2>
          <ol className="recipe-page-instructions-list list-decimal pl-6">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
