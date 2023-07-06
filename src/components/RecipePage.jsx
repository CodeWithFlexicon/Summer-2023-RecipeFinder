import React, { useState, useEffect } from "react";
import { useParams, Link, Form } from "react-router-dom";

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
      <div className="recipe-page-content">
        <div className="recipe-page-title-container mb-4">
          <h1 className="recipe-page-title text-3xl font-bold">
            {recipe.title}
          </h1>
        </div>
        <div className="recipe-page-image-container mb-4">
          <img src={recipe.img} alt={recipe.title} className="w-64 h-auto" />
        </div>
        <div className="recipe-page-details mb-4">
          <p className="recipe-page-category text-black-500">
            Category: {recipe.category.join(", ")}
          </p>
          <p className="recipe-page-preparation text-black-500">
            Preparation Time: {recipe.preparation} Minutes
          </p>
        </div>
        <div className="recipe-page-desc mb-6">{recipe.desc}</div>
        {recipe.ingredients.length > 0 && (
          <div className="recipe-page-ingredients mb-6">
            <h2 className="recipe-page-subtitle text-lg font-semibold mb-2">
              Ingredients
            </h2>
            <ul className="recipe-page-ingredients-list list-disc pl-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}
        {recipe.instructions.length > 0 && (
          <div className="recipe-page-instructions mb-6">
            <h2 className="recipe-page-subtitle text-lg font-semibold mb-2">
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
        )}
      </div>
      <div className="recipe-page-buttons flex justify-end mt-4">
        <Link
          to={`/recipes/${recipe.title}/edit`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
        >
          Edit
        </Link>
        <Form
          method="post"
          action={`/recipes/${recipe.title}/delete?recipe=${recipe.title}`}
          onSubmit={(e) => {
            if (!confirm("Please confirm you want to delete this recipe.")) {
              e.preventDefault();
            }
          }}
        >
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4">
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
};

export default RecipePage;
