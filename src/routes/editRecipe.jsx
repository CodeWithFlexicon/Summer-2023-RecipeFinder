import React, { useState } from "react";
import {
  Form,
  useLoaderData,
  Link,
  redirect,
  useNavigate,
} from "react-router-dom";

export async function loader({ params }) {
  const recipesResponse = await fetch(`http://localhost:3000/recipes`);
  const recipes = await recipesResponse.json();
  const recipe = recipes.find((recipe) => recipe.title === params.recipeId);

  if (!recipe) {
    console.error("Recipe not found");
    return { recipe: null };
  }

  const recipeId = recipe.id;
  const recipeResponse = await fetch(
    `http://localhost:3000/recipes/${recipeId}`
  );
  const fetchedRecipe = await recipeResponse.json();
  return { recipe: fetchedRecipe };
}

export async function action({ params, request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const preparedRecipe = {
    ...updates,
  };
  const response = await fetch(`http://localhost:3000/recipes/${params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preparedRecipe),
  });

  return redirect(`/recipes/${params.id}`);
}

function EditRecipe() {
  const { recipe } = useLoaderData();
  const navigate = useNavigate();

  const [editedRecipeData, setEditedRecipeData] = useState({
    title: recipe.title,
    preparation: recipe.preparation,
    category: recipe.category,
    desc: recipe.desc,
    img: recipe.img,
    ingredients: recipe.ingredients || [],
    instructions: recipe.instructions || [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedRecipeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setEditedRecipeData((prevState) => {
      const updatedCategory = checked
        ? [...prevState.category, value]
        : prevState.category.filter((category) => category !== value);
      return {
        ...prevState,
        category: updatedCategory,
      };
    });
  };

  const handleIngredientChange = (index, value) => {
    setEditedRecipeData((prevState) => {
      const updatedIngredients = [...prevState.ingredients];
      updatedIngredients[index] = value;
      return {
        ...prevState,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleAddIngredient = () => {
    setEditedRecipeData((prevState) => {
      const updatedIngredients = [...prevState.ingredients, ""];
      return {
        ...prevState,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleRemoveIngredient = (index) => {
    setEditedRecipeData((prevState) => {
      const updatedIngredients = [...prevState.ingredients];
      updatedIngredients.splice(index, 1);
      return {
        ...prevState,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleInstructionChange = (index, value) => {
    setEditedRecipeData((prevState) => {
      const updatedInstructions = [...prevState.instructions];
      updatedInstructions[index] = value;
      return {
        ...prevState,
        instructions: updatedInstructions,
      };
    });
  };

  const handleAddInstruction = () => {
    setEditedRecipeData((prevState) => {
      const updatedInstructions = [...prevState.instructions, ""];
      return {
        ...prevState,
        instructions: updatedInstructions,
      };
    });
  };

  const handleRemoveInstruction = (index) => {
    setEditedRecipeData((prevState) => {
      const updatedInstructions = [...prevState.instructions];
      updatedInstructions.splice(index, 1);
      return {
        ...prevState,
        instructions: updatedInstructions,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:3000/recipes/${recipe.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecipeData),
    });

    // Redirect to the updated recipe page
    navigate(`/recipes/${recipe.title}`);
  };

  return (
    <>
      <Link to={`/recipes/${recipe.title}`}>{"<"} Back</Link>
      <Form
        method="post"
        className="w-full max-w-7xl mx-auto p-4 bg-white rounded shadow"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={editedRecipeData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Prep Time</label>
          <input
            type="number"
            name="preparation"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={editedRecipeData.preparation}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <div>
            <label className="mr-2">
              <input
                type="checkbox"
                name="category"
                value="Breakfast"
                checked={editedRecipeData.category.includes("Breakfast")}
                onChange={handleCategoryChange}
              />
              Breakfast
            </label>
            <label className="mr-2">
              <input
                type="checkbox"
                name="category"
                value="Lunch"
                checked={editedRecipeData.category.includes("Lunch")}
                onChange={handleCategoryChange}
              />
              Lunch
            </label>
            <label className="mr-2">
              <input
                type="checkbox"
                name="category"
                value="Dinner"
                checked={editedRecipeData.category.includes("Dinner")}
                onChange={handleCategoryChange}
              />
              Dinner
            </label>
            <label className="mr-2">
              <input
                type="checkbox"
                name="category"
                value="Dessert"
                checked={editedRecipeData.category.includes("Dessert")}
                onChange={handleCategoryChange}
              />
              Dessert
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="desc"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={editedRecipeData.desc}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            name="img"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={editedRecipeData.img}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Ingredients</label>
          {editedRecipeData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                name="ingredient"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={ingredient}
                onChange={(event) =>
                  handleIngredientChange(index, event.target.value)
                }
              />
              <button
                type="button"
                className="ml-2 text-red-500 focus:outline-none"
                onClick={() => handleRemoveIngredient(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-green-500 focus:outline-none"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Instructions</label>
          {editedRecipeData.instructions.map((instruction, index) => (
            <div key={index} className="flex mb-2">
              <textarea
                name="instruction"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={instruction}
                onChange={(event) =>
                  handleInstructionChange(index, event.target.value)
                }
              />
              <button
                type="button"
                className="ml-2 text-red-500 focus:outline-none"
                onClick={() => handleRemoveInstruction(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-green-500 focus:outline-none"
            onClick={handleAddInstruction}
          >
            Add Instruction
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </Form>
    </>
  );
}

export default EditRecipe;
