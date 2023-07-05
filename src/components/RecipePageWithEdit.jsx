import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const { title } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState(null);

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
        setUpdatedRecipe(filteredRecipe);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [title]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (window.confirm("Are you sure you want to save the changes?")) {
      setRecipe(updatedRecipe);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setUpdatedRecipe(recipe);
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientsChange = (index, event) => {
    const { value } = event.target;
    setUpdatedRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index] = value;
      return {
        ...prevRecipe,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleInstructionsChange = (index, event) => {
    const { value } = event.target;
    setUpdatedRecipe((prevRecipe) => {
      const updatedInstructions = [...prevRecipe.instructions];
      updatedInstructions[index] = value;
      return {
        ...prevRecipe,
        instructions: updatedInstructions,
      };
    });
  };

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
          {editing ? (
            <input
              type="text"
              name="title"
              value={updatedRecipe.title}
              onChange={handleInputChange}
              className="recipe-page-title-input text-3xl font-bold"
            />
          ) : (
            <h1 className="recipe-page-title text-3xl font-bold">
              {recipe.title}
            </h1>
          )}
        </div>
        <div className="recipe-page-image-container mb-4">
          {editing ? (
            <input
              type="text"
              name="img"
              value={updatedRecipe.img}
              onChange={handleInputChange}
              className="w-64 h-auto"
            />
          ) : (
            <img src={recipe.img} alt={recipe.title} className="w-64 h-auto" />
          )}
        </div>
        <div className="recipe-page-details mb-4">
          <p className="recipe-page-category text-gray-500">
            Category:{" "}
            {editing ? (
              <input
                type="text"
                name="category"
                value={updatedRecipe.category.join(", ")}
                onChange={handleInputChange}
                className="recipe-page-category-input text-gray-500"
              />
            ) : (
              recipe.category.join(", ")
            )}
          </p>
          <p className="recipe-page-price text-gray-500">
            Price:{" "}
            {editing ? (
              <input
                type="text"
                name="price"
                value={updatedRecipe.price}
                onChange={handleInputChange}
                className="recipe-page-price-input text-gray-500"
              />
            ) : (
              recipe.price
            )}
          </p>
        </div>
        <div className="recipe-page-desc mb-6">
          {editing ? (
            <textarea
              name="desc"
              value={updatedRecipe.desc}
              onChange={handleInputChange}
              className="recipe-page-desc-input"
            />
          ) : (
            recipe.desc
          )}
        </div>
        <div className="recipe-page-ingredients mb-6">
          <h2 className="recipe-page-subtitle text-lg font-semibold mb-2">
            Ingredients
          </h2>
          <ul className="recipe-page-ingredients-list list-disc pl-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {editing ? (
                  <input
                    type="text"
                    value={updatedRecipe.ingredients[index]}
                    onChange={(event) => handleIngredientsChange(index, event)}
                    className="text-gray-700"
                  />
                ) : (
                  ingredient
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="recipe-page-instructions mb-6">
          <h2 className="recipe-page-subtitle text-lg font-semibold mb-2">
            Instructions
          </h2>
          <ol className="recipe-page-instructions-list list-decimal pl-6">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {editing ? (
                  <textarea
                    value={updatedRecipe.instructions[index]}
                    onChange={(event) => handleInstructionsChange(index, event)}
                    className="text-gray-700"
                  />
                ) : (
                  instruction
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="recipe-page-buttons flex justify-end mt-4">
        {editing ? (
          <>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4">
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
