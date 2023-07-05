import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

export async function action(recipeData) {
  try {
    const response = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      throw new Error("Could not save recipe data.");
    }

    const savedRecipe = await response.json();

    console.log("Saved Recipe: ", savedRecipe);
  } catch (err) {
    console.error(err);
  }
}

const AddRecipeForm = () => {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCategories((prevCategories) => [...prevCategories, selectedCategory]);
    } else {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category !== selectedCategory)
      );
    }
  };

  const handleIngredientChange = (index, value) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients[index] = value;
      return updatedIngredients;
    });
  };

  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => [...prevIngredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients.splice(index, 1);
      return updatedIngredients;
    });
  };

  const handleInstructionChange = (index, value) => {
    setInstructions((prevInstructions) => {
      const updatedInstructions = [...prevInstructions];
      updatedInstructions[index] = value;
      return updatedInstructions;
    });
  };

  const handleAddInstruction = () => {
    setInstructions((prevInstructions) => [...prevInstructions, ""]);
  };

  const handleRemoveInstruction = (index) => {
    setInstructions((prevInstructions) => {
      const updatedInstructions = [...prevInstructions];
      updatedInstructions.splice(index, 1);
      return updatedInstructions;
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create recipe object with form data including selected categories, ingredients, and instructions
    const recipeData = {
      title: event.target.elements.title.value,
      category: categories,
      desc: event.target.elements.desc.value,
      img: event.target.elements.img.value,
      ingredients: ingredients.filter(Boolean), // Remove empty ingredient fields
      instructions: instructions.filter(Boolean), // Remove empty instruction fields
    };

    // Call the action function to save recipe data and perform necessary actions
    await action(recipeData);

    // Redirect to the recipes page
    navigate("/recipes");
  };

  return (
    <Form
      method="post"
      className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          name="title"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Category</label>
        <div className="flex flex-wrap">
          <label className="mr-4">
            <input
              type="checkbox"
              name="category"
              value="Breakfast"
              onChange={handleCategoryChange}
            />{" "}
            Breakfast
          </label>
          <label className="mr-4">
            <input
              type="checkbox"
              name="category"
              value="Lunch"
              onChange={handleCategoryChange}
            />{" "}
            Lunch
          </label>
          <label className="mr-4">
            <input
              type="checkbox"
              name="category"
              value="Dinner"
              onChange={handleCategoryChange}
            />{" "}
            Dinner
          </label>
          <label className="mr-4">
            <input
              type="checkbox"
              name="category"
              value="Dessert"
              onChange={handleCategoryChange}
            />{" "}
            Dessert
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="desc"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Image URL</label>
        <input
          type="text"
          name="img"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div className="flex items-center mb-2" key={index}>
            <input
              type="text"
              name={`ingredient-${index}`}
              value={ingredient}
              onChange={(event) =>
                handleIngredientChange(index, event.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
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
        {instructions.map((instruction, index) => (
          <div className="flex items-center mb-2" key={index}>
            <input
              type="text"
              name={`instruction-${index}`}
              value={instruction}
              onChange={(event) =>
                handleInstructionChange(index, event.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
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
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Save Recipe
        </button>
      </div>
    </Form>
  );
};

export default AddRecipeForm;
